const { getPlaqueDataFromOhtPage } = require('../index.js');

const url = Buffer.from('https://www.heritagetrust.on.ca/en/index.php/plaques/district-court-house-and-gaol').toString('base64');

const context = {};

(async () => console.log(await getPlaqueDataFromOhtPage(url, context)))();
