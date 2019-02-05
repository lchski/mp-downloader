const fs = require('fs');

const { getAllRecordsInFirestoreCollection } = require('./lib/firestore');

(async () => {
    let extractedRecords = [];

    const records = await getAllRecordsInFirestoreCollection('plaques');

    records.forEach((record) => extractedRecords.push(record.data()));

    extractedRecords = extractedRecords.map((record) => {
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
    });

    await fs.writeFile(`${__dirname}/../data/plaques.json`, JSON.stringify(extractedRecords), (err) => {
        if (err) {
            console.error(err);
            return;
        };
        
        console.log(`Wrote ${extractedRecords.length} plaques to data/plaques.json.`);
    })
})();
