const express = require('express');
const SqlService = require('../Modules/SQL/connection.js');
const router = express.Router();

router.post('/insert', async (req, res) => {
  const { Nombre, Correo, Telefono, FechaRegistro } = req.body;
  const db = new SqlService();
  try {
    await db.connectToDb();
    await db.query(
      "INSERT INTO clientes (Nombre, correo, Telefono, FechaRegistro) VALUES (?, ?, ?, ?)",
      [Nombre, Correo, Telefono, FechaRegistro]
    );
    res.status(200).send("User registered in SQL.");
  } catch (err) {
    console.error("SQL error:", err);
    res.status(500).send("Error registering user in SQL.");
  } finally {
    await db.closeConnection();
  }
});

module.exports = router;