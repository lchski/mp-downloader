const fetch = require('node-fetch');

const { saveToFirestore } = require('./lib/firestore');
const { extractPlaqueSlug, extractPlaqueData } = require('./lib/extractors/plaqueDetails');
const { extractPlaquePageUrls } = require('./lib/extractors/indexPageUrls');

exports.getPlaqueDataFromOhtPage = async (data, context) => {
    const ohtResult = await fetch(Buffer.from(data.data, 'base64').toString());

    const responseBody = await ohtResult.text();

    const resJson = {
        status: ohtResult.status,
        statusText: ohtResult.statusText,
        url: ohtResult.url,
        plaqueDetails: extractPlaqueData(responseBody),
    };

    await saveToFirestore(
        extractPlaqueSlug(ohtResult.url),
        {
            id: extractPlaqueSlug(ohtResult.url),
            url: ohtResult.url,
            ...resJson.plaqueDetails,
        },
        'plaques'
    );

    return resJson;
};

exports.getPlaquePageUrlsFromOhtIndexPage = async (req, res) => {
    const ohtResult = await fetch(req.body.url);

    const responseBody = await ohtResult.text();

    const resJson = {
        status: ohtResult.status,
        statusText: ohtResult.statusText,
        url: ohtResult.url,
        plaquePageUrls: extractPlaquePageUrls(responseBody),
    };

    res.json(resJson);
};
