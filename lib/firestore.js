const admin = require('firebase-admin');

let db;

// Initialize Firestore, depending on the environment.
switch (process.env.NODE_ENV) {
  case 'dev':
    const serviceAccount = require('../env/oht-plaques-firebase-developer-admin.json');

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });

    db = admin.firestore();
    break;

  default:
    admin.initializeApp({
        credential: admin.credential.applicationDefault()
    });

    db = admin.firestore();
}

// Function to save a record to Firestore.
module.exports.saveToFirestore = async (document, payload, collection) => {
  payload['updatedAt'] = Date.now();

  return db
    .collection(collection)
    .doc(document)
    .set(payload, { merge: true })
    .then(resp => true)
    .catch(e => {
      console.log(e.message);
    });
};
