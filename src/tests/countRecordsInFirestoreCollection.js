const { countRecordsInFirestoreCollection } = require('../lib/firestore');

(async () => console.log(await countRecordsInFirestoreCollection('plaques')))();
