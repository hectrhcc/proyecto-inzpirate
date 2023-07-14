const express = require('express');
const app = express();
// middleware para manejar datos del formulario
app.use(express.urlencoded({ extended: true }));

// Indicamos que la carpeta 'public' contiene los archivos estáticos
//app.use(express.static('public'));
app.use(express.static(__dirname + "/public/"));

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
    database:'heroku_b2de14395b88296',
    timezone: 'America/Santiago' // zona horaria
})

    async function insertarDatos(actividad, direccion, comuna, fecha, res) {
        try {
          const result = await sql.query(`INSERT INTO actividades (actividad, direccion, comuna, fecha) VALUES (?, ?, ?, ?)`, [actividad, direccion, comuna, fecha]);
          console.log(result);
          //res.send('Datos recibidos');
        } catch (error) {
          console.error('Error al insertar datos:', error);
          //res.status(500).send('Error al insertar datos');
        }
      }

      app.post('/agregar-actividad', function(req, res) {
        var actividad = req.body.actividad;
        var direccion = req.body.direccion;
        var comuna = req.body.comuna;
        var fecha = req.body.fecha;
        insertarDatos(actividad, direccion, comuna, fecha, res);
       // res.send({
       //   success: 'Actividad agregada!'
       // });
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


  // Agrega una nueva tarea semanal a la base de datos
  async function insertarDatos2(persona, tarea, fechainicio, fechafinal, res) {
    try {
      const result = await sql.query(`INSERT INTO agendasemanal (persona, tarea, fechainicio, fechafinal) VALUES (?, ?, ?, ?)`, [persona, tarea, fechainicio, fechafinal]);
      console.log(result);
      //res.send('Datos recibidos');
    } catch (error) {
      console.error('Error al insertar datos:', error);
      //res.status(500).send('Error al insertar datos');
    }
  }

  app.post('/agregar-semana', function(req, res) {
    var persona = req.body.persona;
    var tarea = req.body.tarea;
    var fechainicio = req.body.fechainicio;
    console.log(req.body.fechainicio)
    var fechafinal = req.body.fechafinal;
    insertarDatos2(persona, tarea, fechainicio, fechafinal, res);
   // res.send({
   //   success: 'Actividad agregada!'
   // });
  });

  
app.get('/agendasemanal', async function(req, res) {
  try {
    const [rows] = await sql.query(`SELECT * FROM agendasemanal`);
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener datos:', error);
    res.status(500).send('Error al obtener datos');
  }
});


  // Agrega una nueva tarea mensual a la base de datos
  async function insertarDatos3(persona, tarea, mes, res) {
    try {
      const result = await sql.query(`INSERT INTO agendames (persona, tarea, mes) VALUES (?, ?, ?)`, [persona, tarea, mes]);
      console.log(result);
      //res.send('Datos recibidos');
    } catch (error) {
      console.error('Error al insertar datos:', error);
      //res.status(500).send('Error al insertar datos');
    }
  }

  app.post('/agregar-mes', function(req, res) {
    var persona = req.body.persona;
    var tarea = req.body.tarea;
    var mes = req.body.mes;
    insertarDatos3(persona, tarea, mes, res);
   // res.send({
   //   success: 'Actividad agregada!'
   // });
  });

  
app.get('/agendames', async function(req, res) {
  try {
    const [rows] = await sql.query(`SELECT * FROM agendames`);
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener datos:', error);
    res.status(500).send('Error al obtener datos');
  }
});