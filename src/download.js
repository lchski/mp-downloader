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
    await fs.writeFile(`${__dirname}/../data/plaques.tsv`, convertRecordsToTsv(extractedRecords), (err) => {
        if (err) {
            console.error(err);
            return;
        };
        
        console.log(`Wrote ${extractedRecords.length} plaques to data/plaques.tsv.`);
    });
})();

const convertRecordsToTsv = (records) => {
    let rows = addRow([], ['plaqueId', 'category', 'key', 'value']);

    recordsTemp = [records[0], records[1], records[2]];

    recordsTemp.forEach((record) => {
        let detailRows = extractDetailRows(record.details);
        let locationRows = extractLocationRows(record.location);
        let themeRows = extractThemeRows(record.themes);

        detailRows.forEach((row) => rows = addRow(rows, pushToBeginningOfArray(row, record.id)));
        locationRows.forEach((row) => rows = addRow(rows, pushToBeginningOfArray(row, record.id)));
        themeRows.forEach((row) => rows = addRow(rows, pushToBeginningOfArray(row, record.id)));
    });

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
    let rows = [
        ['region', locationItems.region.title],
        ['county', locationItems.county.title],
        ['municipality', locationItems.municipality.title],
        ['address', locationItems.address],
    ];

    rows = rows.map((row) => pushToBeginningOfArray(row, 'location'));

    return rows;
};

const extractThemeRows = (themeItems) => {
    let rows = themeItems.map((theme) => ['theme', theme.title]);

    rows = rows.map((row) => pushToBeginningOfArray(row, 'themes'));

    return rows;
};

const pushToBeginningOfArray = (arrayToModify, itemToPush) => {
    let arrayCopy = [...arrayToModify];

    arrayCopy.unshift(itemToPush);

    return arrayCopy;
};
