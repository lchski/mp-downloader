const cheerio = require('cheerio');

const extractPlaqueSlug = (plaquePageUrl) => plaquePageUrl.replace('https://www.heritagetrust.on.ca/en/index.php/plaques/', '').replace('https://www.heritagetrust.on.ca/en/plaques/', '');

const extractPlaqueData = (plaquePageHtml) => {
    const $ = cheerio.load(plaquePageHtml);

    const plaqueSection = $('#content');

    return {
        ...extractPlaqueSummary(plaqueSection),
        location: extractPlaqueLocation(plaqueSection.find('h3:contains("Location")').parent()),
        themes: extractPlaqueThemes(plaqueSection.find('h3:contains("Themes")').parent(), $),
    };
};

const extractPlaqueSummary = (plaqueSection) => ({
    title: plaqueSection.find('h1').text(),
    text: plaqueSection.find('section p').first().text(),
});

const extractPlaqueLocation = (locationSection) => ({
    address: locationSection.find('p').first().text(),
    municipality: extractLink(locationSection.find('div p:nth-child(3) a')),
    county: extractLink(locationSection.find('div p:nth-child(2) a')),
    region: extractLink(locationSection.find('div p:nth-child(1) a')),
});

const extractPlaqueThemes = (themesSection, $) => {
    themes = [];

    themesSection.find("ul li a").each((i, elem) => {
        themes.push(extractLink($(elem)));
    });

    return themes;
};

const extractLink = (linkElement) => ({
    title: linkElement.text(),
    url: linkElement.attr('href'),
});

module.exports = { extractPlaqueSlug, extractPlaqueData, extractPlaqueSummary, extractPlaqueLocation, extractPlaqueThemes, extractLink };
