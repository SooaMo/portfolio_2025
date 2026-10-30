# sooamo.github.io

My portfolio site. I'm Sooa Mo, a UX/UI and graphic designer based in Metro Vancouver, BC.

**Live:** https://sooamo.github.io

## What's here

Case studies for my work, school, and personal projects.

## How it's built

Plain HTML, CSS, and JavaScript, with Bootstrap for the image modal. No build step. The navbar and footer live in `partials/` and get pulled into each page by `js/include.js`.

I hand-coded the first version and have kept updating it with help from Claude.

```
index.html          home
*.html              project pages
style.css           all styles
partials/           navbar, footer
js/include.js       loads partials
js/script.js        cursor, image zoom, back-to-top, scroll reveal
img/  pdf/          images and resume
```

## Running it locally

`include.js` uses `fetch`, so opening the files directly won't load the navbar. Run a local server instead:

```
python3 -m http.server
```

Then go to `localhost:8000`.

## Contact

sooa24@gmail.com · [LinkedIn](https://www.linkedin.com/in/sooamo/)
