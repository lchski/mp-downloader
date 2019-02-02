const fetch = require('node-fetch');
const cheerio = require('cheerio');

exports.getPlaqueDataFromOhtPage = async (req, res) => {
    const ohtResult = await fetch(req.body.url);

    const responseBody = await ohtResult.text();

    const $ = cheerio.load(responseBody);

    let plaqueDetails = {};

    const plaqueSection = $('#content');

    plaqueDetails.title = plaqueSection.find('h1').text();
    plaqueDetails.text = plaqueSection.find('section p').first().text();

    const locationSection = plaqueSection.find('h3:contains("Location")').parent();

    plaqueDetails.location = {};
    plaqueDetails.location.address = locationSection.find('p').first().text();
    plaqueDetails.location.region = locationSection.find('div p:nth-child(1) a').text();
    plaqueDetails.location.county = locationSection.find('div p:nth-child(2) a').text();
    plaqueDetails.location.municipality = locationSection.find('div p:nth-child(3) a').text();

    const resJson = {
        status: ohtResult.status,
        statusText: ohtResult.statusText,
        url: ohtResult.url,
        plaqueDetails: plaqueDetails
    };

    res.json(resJson);
};
