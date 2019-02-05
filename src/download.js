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

    // Export JSON file.
    await fs.writeFile(`${__dirname}/../data/plaques.json`, JSON.stringify(extractedRecords), (err) => {
        if (err) {
            console.error(err);
            return;
        };
        
        console.log(`Wrote ${extractedRecords.length} plaques to data/plaques.json.`);
    });

    // Export TSV.
    await fs.writeFile(`${__dirname}/../data/plaques.csv`, convertRecordsToTsv(extractedRecords), (err) => {
        if (err) {
            console.error(err);
            return;
        };
        
        console.log(`Wrote ${extractedRecords.length} plaques to data/plaques.tsv.`);
    });
})();

const convertRecordsToTsv = (records) => {
    let rows = addRow([], ['plaqueId', 'category', 'key', 'value']);

    records.forEach((record) => {
        console.log(extractDetailRows(record.details));
    })

    return rows;
};

const addRow = (existingRows, newRowItems) => {
    return existingRows += newRowItems.join('\t') + '\r\n';
};

const extractDetailRows = (detailItems) => {
    let rows = [
        ['title', detailItems.title],
        ['text', detailItems.text],
    ];

    rows = rows.map((row) => pushToBeginningOfArray(row, 'details'));

    return rows;
};

const extractLocationRows = (locationItems) => {

};

const extractThemeRows = (themeItems) => {

};

const pushToBeginningOfArray = (arrayToModify, itemToPush) => {
    let arrayCopy = [...arrayToModify];

    arrayCopy.unshift(itemToPush);

    return arrayCopy;
};
