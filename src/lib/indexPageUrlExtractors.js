const cheerio = require('cheerio');

const extractPlaquePageUrls = (indexPageHtml) => {
    const $ = cheerio.load(indexPageHtml);

    return ["test", "test2"];
};

module.exports = { extractPlaquePageUrls };
