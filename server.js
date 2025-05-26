const express = require('express');
const path = require('path');

const firebaseRoutes = require('./routes/firebaseRoutes');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/firebase', firebaseRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});