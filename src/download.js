const { getAllRecordsInFirestoreCollection } = require('./lib/firestore');

(async () => {
    let extractedRecords = [];

    const records = await getAllRecordsInFirestoreCollection('plaques');

    records.forEach((record) => extractedRecords.push(record.data()));

    console.log(extractedRecords.map((record) => {
        let reshapedRecord = {
            details: {
                title: record.title,
                text: record.text,
                url: record.url,
                scrapedAt: record.updatedAt
            },
            ...record,
        };

        delete reshapedRecord.title;
        delete reshapedRecord.text;
        delete reshapedRecord.url;
        delete reshapedRecord.updatedAt;

        return reshapedRecord;
    }));
})();
