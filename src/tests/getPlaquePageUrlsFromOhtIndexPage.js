const { getPlaquePageUrlsFromOhtIndexPage } = require('../index.js');

const url = Buffer.from('https://www.heritagetrust.on.ca/en/online-plaque-guide/p2?handle=plaques-form&fields%5Bkeyword%5D=&fields%5Btheme%5D=').toString('base64');

const data = {
    data: url,
};

const context = {};

(async () => console.log(await getPlaquePageUrlsFromOhtIndexPage(data, context)))();
