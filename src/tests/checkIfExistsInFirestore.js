const { checkIfExistsInFirestore } = require('../lib/firestore');

(async () => console.log('Should be true (district-court-house-and-gaol)', await checkIfExistsInFirestore('district-court-house-and-gaol', 'plaques')))();
(async () => console.log('Should be false (blahblahblah)', await checkIfExistsInFirestore('blahblahblah', 'plaques')))();
