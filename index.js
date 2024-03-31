const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public/"));

app.listen(3000, function() {
  console.log('Servidor iniciado en el puerto 3000');
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});


app.post('/agregar-actividad', function(req, res) {
  // Redirect instead of query
  res.redirect('/');
});

app.get('/actividades', function(req, res) {
  // Return mock data instead of query
  res.json([
    {id: 1, name: 'Activity 1'},
    {id: 2, name: 'Activity 2'}  
  ]);
});


// Other routes

app.post('/agregar-semana', function(req, res) {
  res.redirect('/');
});

app.get('/agendasemanal', function(req, res) {
  res.json([]); 
});


// And so on for other routes..

app.post('/agregar-hora', function(req, res) {
  res.redirect('/');
});

app.get('/asistencia', function(req, res) {
  res.json([]);
});