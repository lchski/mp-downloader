const { getPlaquePageUrlsFromOhtIndexPage } = require('../index.js');

req = {
    body: {
        url: "https://www.heritagetrust.on.ca/en/online-plaque-guide/p2?handle=plaques-form&fields%5Bkeyword%5D=&fields%5Btheme%5D="
    }
};

res = {
    json: (text) => console.log(text)
};

getPlaquePageUrlsFromOhtIndexPage(req, res);
