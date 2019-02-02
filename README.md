# Ontario Heritage Trust Plaques—Scraped

Ever cruise (or stroll) around Ontario and see those [dashing blue plaques](https://www.heritagetrust.on.ca/en/index.php/pages/programs/provincial-plaque-program)? Ever want a structured data index of those plaques?

Here’s a set of functions that scrape and extract [the Ontario Heritage Trust’s plaque database](https://www.heritagetrust.on.ca/en/index.php/online-plaque-guide). (Because, y’know, _asking_ for this data would be too easy.)

(Work in progress, not a professional coder, all the usual disclaimers. Apologies in advance for my love of plaques.)

## Process sketch

1. `Indexer` spiders through the database (page by page), assembling the list of plaque page URLs. It sends each URL to Pub/Sub.
2. Pub/Sub triggers a background function, `Extractor`.
3. `Extractor` loads the plaque page URL and extracts the plaque details, storing them in Firestore.

## Prior art

This database already _exists_, in a few places and forms:

* [Ontario Heritage Trust’s database](https://www.heritagetrust.on.ca/en/index.php/online-plaque-guide)
* [Alan L. Brown’s ontarioplaques.com](http://ontarioplaques.com/)

## Other plaques to index

* [Directory of Federal Heritage Designations](https://www.pc.gc.ca/apps/dfhd/search-recherche_eng.aspx)
* City of Ottawa?
