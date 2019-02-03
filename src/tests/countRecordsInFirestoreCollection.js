const { countRecordsInFirestoreCollection } = require('../lib/firestore');

(async () => console.log('Records in `plaques`:', await countRecordsInFirestoreCollection('plaques')))();
(async () => console.log('Records in `plaquePageList`:', await countRecordsInFirestoreCollection('plaquePageList')))();
