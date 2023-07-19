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


  // Agrega una nueva hora entrada en la mañana la base de datos
  async function insertarDatos4(nombre, hora_entrada_manana, fecha, res) {
    try {
      const result = await sql.query(`INSERT INTO asistencia (nombre, hora_entrada_manana, fecha) VALUES (?, ?, ?)`, [nombre, hora_entrada_manana,fecha]);
      console.log(result);
      //res.send('Datos recibidos');
    } catch (error) {
      console.error('Error al insertar datos:', error);
      //res.status(500).send('Error al insertar datos');
    }
  }
//o hago 4 formularios o aqui hago las bifurcaciones
  app.post('/agregar-hora', function(req, res) {
    let nombre = req.body.nombre; //no es el id
    let hora_entrada_manana = req.body.hora_entrada_manana;
    let fecha = req.body.fecha;
    insertarDatos4(nombre,hora_entrada_manana, fecha, res);
  
    // res.send({
   //   success: 'Actividad agregada!'
   // });
  });

  // Agrega una nueva hora salida en la mañana la base de datos
  async function actualizarDatos(nombre, hora_salida_manana, fecha, res) {
    try {
      const result = await sql.query(`UPDATE asistencia SET hora_salida_manana = ? WHERE nombre = ? and fecha =?`, [hora_salida_manana,nombre,fecha]);
      console.log(result);
      //res.send('Datos recibidos');
    } catch (error) {
      console.error('Error al insertar datos:', error);
      //res.status(500).send('Error al insertar datos');
    }
  }

    // Agrega una nueva hora entrada en la tarde la base de datos
    async function actualizarDatos2(nombre, hora_entrada_tarde, fecha, res) {
      try {
        const result = await sql.query(`UPDATE asistencia SET hora_entrada_tarde = ? WHERE nombre = ? and fecha =?`, [hora_entrada_tarde,nombre,fecha]);
        console.log(result);
        //res.send('Datos recibidos');
      } catch (error) {
        console.error('Error al insertar datos:', error);
        //res.status(500).send('Error al insertar datos');
      }
    }

      // Agrega una nueva hora salida en la tarde la base de datos
  async function actualizarDatos3(nombre, hora_salida_tarde, fecha, res) {
    try {
      const result = await sql.query(`UPDATE asistencia SET hora_salida_tarde = ? WHERE nombre = ? and fecha =?`, [hora_salida_tarde,nombre,fecha]);
      console.log(result);
      //res.send('Datos recibidos');
    } catch (error) {
      console.error('Error al insertar datos:', error);
      //res.status(500).send('Error al insertar datos');
    }
  }


  app.post('/agregar-hora2', function(req, res) {
    let nombre = req.body.nombre; //no es el id
    let hora_salida_manana = req.body.hora_salida_manana;
    let fecha = req.body.fecha;
    actualizarDatos(nombre,hora_salida_manana, fecha, res);
  
    // res.send({
   //   success: 'Actividad agregada!'
   // });
  });

  app.post('/agregar-hora3', function(req, res) {
    let nombre = req.body.nombre; //no es el id
    let hora_entrada_tarde = req.body.hora_entrada_tarde;
    let fecha = req.body.fecha;
    actualizarDatos2(nombre,hora_entrada_tarde, fecha, res);
  
    // res.send({
   //   success: 'Actividad agregada!'
   // });
  });


  app.post('/agregar-hora4', function(req, res) {
    let nombre = req.body.nombre; //no es el id
    let hora_salida_tarde = req.body.hora_salida_tarde;
    let fecha = req.body.fecha;
    actualizarDatos3(nombre,hora_salida_tarde, fecha, res);
  
    // res.send({
   //   success: 'Actividad agregada!'
   // });
  });

  app.get('/asistencia', async function(req, res) {
    try {
      const [rows] = await sql.query(`SELECT * FROM asistencia`);
      res.json(rows);
    } catch (error) {
      console.error('Error al obtener datos:', error);
      res.status(500).send('Error al obtener datos');
    }
  });
  