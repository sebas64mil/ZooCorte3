// firebase/firebase.js
const admin = require("firebase-admin");

const serviceAccount = require("../ruta/a/tu/serviceAccountKey.json"); // descarga desde Firebase

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = app;