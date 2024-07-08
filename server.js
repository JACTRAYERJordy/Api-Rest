const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 3500;

// Configuraciones del CORS
app.use(cors());
// Configuraciones del Body Parser
app.use(bodyParser.json());

// Configurar la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Jordy.2003',
  database: 'db_curso_app'
});

db.connect(err => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL.');
});

// Este Endpoint tiene la función de insertar una nueva persona
app.post('/insert', (req, res) => {
  const { cedula, nombres, apellidos, fecha_nacimiento, telefono, direccion } = req.body;
  const insertQuery = `INSERT INTO esq_datos_personales.persona (cedula, nombres, apellidos, fecha_nacimiento, telefono, direccion)
                       VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(insertQuery, [cedula, nombres, apellidos, fecha_nacimiento, telefono, direccion], (err, result) => {
    if (err) {
      console.error('Error al insertar datos:', err);
      res.status(500).json({ error: 'Error en la inserción de datos' });
      return;
    }
    res.status(200).json({ message: 'Datos insertados correctamente', result });
  });
});

// Este Endpoint se encarga de actualizar una persona
app.post('/update', (req, res) => {
  const { idpersona, cedula, nombres, apellidos, fecha_nacimiento, telefono, direccion } = req.body;
  const updateQuery = `UPDATE esq_datos_personales.persona
                       SET cedula = ?, nombres = ?, apellidos = ?, fecha_nacimiento = ?, telefono = ?, direccion = ?
                       WHERE idpersona = ?`;
  db.query(updateQuery, [cedula, nombres, apellidos, fecha_nacimiento, telefono, direccion, idpersona], (err, result) => {
    if (err) {
      console.error('Error al actualizar datos:', err);
      res.status(500).json({ error: 'Error en la actualización de datos' });
      return;
    }
    res.status(200).json({ message: 'Datos actualizados correctamente', result });
  });
});


// Este Endpoint se encarga de seleccionar una persona
app.post('/select', (req, res) => {
  const { idpersona } = req.body;
  const selectQuery = `SELECT * FROM esq_datos_personales.persona WHERE idpersona = ?`;
  db.query(selectQuery, [idpersona], (err, results) => {
    if (err) {
      console.error('Error al seleccionar datos:', err);
      res.status(500).json({ error: 'Error en la selección de datos' });
      return;
    }
    res.status(200).json(results);
  });
});


// Este Endpoint se encarga de eliminar una persona
app.post('/delete', (req, res) => {
  const { idpersona } = req.body;
  const deleteQuery = `DELETE FROM esq_datos_personales.persona WHERE idpersona = ?`;
  db.query(deleteQuery, [idpersona], (err, result) => {
    if (err) {
      console.error('Error al eliminar datos:', err);
      res.status(500).json({ error: 'Error en la eliminación de datos' });
      return;
    }
    res.status(200).json({ message: 'Datos eliminados correctamente', result });
  });
});

// Este Endpoint se encarga de seleccionar personas con una condición
app.post('/where', (req, res) => {
  const { cedula } = req.body;
  const whereQuery = `SELECT * FROM esq_datos_personales.persona WHERE cedula = ?`;
  db.query(whereQuery, [cedula], (err, results) => {
    if (err) {
      console.error('Error al seleccionar datos con condición:', err);
      res.status(500).json({ error: 'Error en la selección de datos con condición' });
      return;
    }
    res.status(200).json(results);
  });
});

// Iniciar el servidor en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor corriendo en: http://localhost:${port}`);
});
