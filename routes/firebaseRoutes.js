const express = require('express');
const { getFirestore } = require('firebase-admin/firestore');
const firebaseApp = require('../Modules/Firebase/firebase');
const router = express.Router();

const db = getFirestore(firebaseApp);

router.post('/insert', async (req, res) => {
  const { Nombre, Correo, Telefono, FechaRegistro } = req.body;
  try {
    await db.collection('clientes').add({ Nombre, Correo, Telefono, FechaRegistro });
    res.status(200).send("User registered in Firebase.");
  } catch (err) {
    console.error("Firebase error:", err);
    res.status(500).send("Error registering user in Firebase.");
  }
});

module.exports = router;