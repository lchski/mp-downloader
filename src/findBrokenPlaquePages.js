const { getAllRecordIdsInFirestoreCollection } = require('./lib/firestore');

(async () => {
    let plaquePageListRecordIds = await getAllRecordIdsInFirestoreCollection('plaquePageList');
    let plaqueRecordIds = await getAllRecordIdsInFirestoreCollection('plaques');

    const unextractedPlaquePages = plaquePageListRecordIds.filter((record) => ! plaqueRecordIds.includes(record));

    console.log(`${unextractedPlaquePages.length} records missing!`);
    console.log(unextractedPlaquePages);
})();
