require('dotenv-safe').config({ allowEmptyValues: true });

const { getPlaqueDataFromOhtPage } = require('./index.js');

req = {
    body: {
        url: "https://www.heritagetrust.on.ca/en/index.php/plaques/district-court-house-and-gaol"
    }
};

res = {
    json: (text) => console.log(text)
};

getPlaqueDataFromOhtPage(req, res);
