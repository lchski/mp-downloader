const { getPlaquePageUrlsFromOhtIndexPage } = require('../index.js');

const url = Buffer.from('https://www.heritagetrust.on.ca/en/online-plaque-guide/p47?handle=plaques-form&fields[keyword]=&fields[theme]=').toString('base64');

const data = {
    data: url,
};

const context = {};

(async () => console.log(await getPlaquePageUrlsFromOhtIndexPage(data, context)))();
