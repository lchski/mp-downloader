const cheerio = require('cheerio');

const extractPlaquePageUrls = (indexPageHtml) => {
    const $ = cheerio.load(indexPageHtml);

    return $('#content ul')
                .first()
                .find('li a')
                .toArray()
                .map((link) => link.attribs.href);
};

module.exports = { extractPlaquePageUrls };
