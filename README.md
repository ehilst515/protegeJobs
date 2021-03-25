# protegeJobs

Proof of concept to source junior roles for protege.dev

## Method

I followed the [CSS-Tricks guide to parse RSS feeds](https://css-tricks.com/how-to-fetch-and-parse-rss-feeds-in-javascript/). It seems to be the fastest route to MVP since RSS normally updates every 12 hours. The RSS feed targeted is the [Career Jet RSS](https://www.careerjet.com/partners/rss.html) filtered to junior software developer roles. It ended up being more hacky than I expected since fetching wouldn't work with out a [CORS Proxy](https://stackoverflow.com/a/43268098/14289261).
