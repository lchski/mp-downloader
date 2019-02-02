const fetch = require('node-fetch');

exports.getPlaqueDataFromOhtPage = async (req, res) => {
    console.log(req.body.url);

    const ohtResult = await fetch(req.body.url);

    const responseBody = await ohtResult.text();

    const resJson = {
        status: ohtResult.status,
        statusText: ohtResult.statusText,
        url: ohtResult.url,
        body: responseBody
    };

    res.json(resJson);
};
