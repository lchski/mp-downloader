const fetch = require('node-fetch');
const cheerio = require('cheerio');

exports.getPlaqueDataFromOhtPage = async (req, res) => {
    const ohtResult = await fetch(req.body.url);

    const responseBody = await ohtResult.text();

    const $ = cheerio.load(responseBody);

    let plaqueDetails = {};

    const plaqueSection = $('#content');

    plaqueDetails.title = plaqueSection.find('h1').text();
    plaqueDetails.text = plaqueSection.find('section:first-of-type p').text();

    const resJson = {
        status: ohtResult.status,
        statusText: ohtResult.statusText,
        url: ohtResult.url,
        plaqueDetails: plaqueDetails
    };

    res.json(resJson);
};
