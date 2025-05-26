const express = require('express');
const path = require('path');

const sqlRoutes = require('./routes/sqlRoutes');
const firebaseRoutes = require('./routes/firebaseRoutes');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Rutas
app.use('/api/sql', sqlRoutes);
app.use('/api/firebase', firebaseRoutes);

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
ff