const express = require('express');
const app = express();
//const cors = require('cors');
// middleware para manejar datos del formulario
app.use(express.urlencoded({ extended: true }));

//app.use(cors());

// Indicamos que la carpeta 'public' contiene los archivos estáticos
app.use(express.static('public'));

// iniciar el servidor
app.listen(3000, function() {
  console.log('Servidor iniciado en el puerto 3000');
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

//conectar a bbdd mysql e insertar los datos

const {createPool} = require('mysql2/promise');

const sql = createPool({
    host:'us-cdbr-east-06.cleardb.net',
    user:'be5fde0c8f67e5',
    password:'df360b64',
    database:'heroku_b2de14395b88296'
})

    async function insertarDatos(actividad, direccion, comuna, fecha, res) {
        try {
          const result = await sql.query(`INSERT INTO actividades (actividad, direccion, comuna, fecha) VALUES (?, ?, ?, ?)`, [actividad, direccion, comuna, fecha]);
          console.log(result);
          res.send('Datos recibidos');
        } catch (error) {
          console.error('Error al insertar datos:', error);
          res.status(500).send('Error al insertar datos');
        }
      }

      app.post('/agregar-actividad', function(req, res) {
        var actividad = req.body.actividad;
        var direccion = req.body.direccion;
        var comuna = req.body.comuna;
        var fecha = req.body.fecha;
        
        insertarDatos(actividad, direccion, comuna, fecha, res);
      });
    
    async function verDatos(){
        const [rows] = await sql.query(`SELECT * FROM actividades`)
        console.log(rows)
    }

verDatos()

app.get('/actividades', async function(req, res) {
    try {
      const [rows] = await sql.query(`SELECT * FROM actividades`);
      res.json(rows);
    } catch (error) {
      console.error('Error al obtener datos:', error);
      res.status(500).send('Error al obtener datos');
    }
  });