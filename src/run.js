const fetch = require('node-fetch');
const cheerio = require('cheerio');

const { publishMessageToPubSub } = require('./lib/pubsub');
const { countRecordsInFirestoreCollection } = require('./lib/firestore');

(async () => {
    let urls = [
        'https://www.heritagetrust.on.ca/en/online-plaque-guide?handle=plaques-form&fields%5Bkeyword%5D=&fields%5Btheme%5D='
    ];

    const firstIndexPage = await fetch(urls[0]);

    const responseBody = await firstIndexPage.text();

    const $ = cheerio.load(responseBody);

    const numberOfPlaques = parseInt($('#content p:contains("plaques found that match your criteria")').first().text().toString().match(/\d/g).join(''));

    // Bail if we already seem to have all the plaques in the database.
    if (await countRecordsInFirestoreCollection('plaques') == numberOfPlaques) {
        console.log('Number of plaques is equal to the number of records in the database. Aborting.')

        return;
    }

    // Calculate the number of index pages, based on 25 plaques per page.
    const numberOfIndexPages = Math.ceil(numberOfPlaques / 25);

    // Generate a list of URLs, from 'p0' to 'p{number of index pages}'.
    Array.apply(null, {length: numberOfIndexPages + 1}).map(Number.call, Number).forEach((i) => {
        urls.push(`https://www.heritagetrust.on.ca/en/online-plaque-guide/p${i}?p=online-plaque-guide&handle=plaques-form&fields%5Bkeyword%5D=&fields%5Btheme%5D=`)
    });

    // Remove 'p0' and 'p1' values.
    urls.splice(1, 2);

    // publish a message to topic `plaqueIndexPagesToSpider` for each URL, with URL as message body
    urls.forEach(async (url) => {
        await publishMessageToPubSub('plaqueIndexPagesToSpider', url);

        console.log('Published an event for:', url);
    });
})();
