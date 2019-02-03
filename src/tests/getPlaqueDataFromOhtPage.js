const { getPlaqueDataFromOhtPage } = require('../index.js');

const url = Buffer.from(JSON.stringify('https://www.heritagetrust.on.ca/en/index.php/plaques/district-court-house-and-gaol')).toString('base64');

const data = {
    data: url,
};

const context = {};

(async () => console.log(await getPlaqueDataFromOhtPage(data, context)))();
