const admin = require('firebase-admin');
const serviceAccount = require('./your-service-account-key.json');

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = firebaseApp;