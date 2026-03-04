# CatScan Interface

This is the frontend for CatScan available at https://scan.jacow.org/

It is built using React, and is hosted using GitHub pages.

This application handle mainly handles the two reports, the word report which is very detailed, and the LaTeX report, which by comparison is very simple. 

Word papers are sent to a DO space (like an s3 bucket) before being checked by the word scanner. This is to handle the 1mb function payload restriction.

## Developing locally

If you just want to modify the frontend, you can using the production backend without causing issues, just run `npm ci` and `npm run start`. You might need a CORS browser addon, to prevent issues retrieving XHR responses.

Running the backend locally as well is somewhat complicated, and is best done for the pieces you need to. 

### Running a LaTeX Checker Locally

You can run [catscan-latex](https://github.com/joshpme/catscan-latex) by using `go run main.go`. You will need an API get for Google's Gemini, which you can get for free using the Google console. See https://ai.google.dev/gemini-api/docs/api-key

### Running the Word Checker Locally

Uploads are first sent to an s3 (compatible) bucket using a web interface. I recommend setting up your own using Digital Ocean. 

The backend uses the word micro-service from [catscan-checker](https://github.com/joshpme/catscan-checker)

To run it locally, you could just need to write a small wrapper to handle input and output parsing. See https://docs.digitalocean.com/products/functions/reference/runtimes/python/

Otherwise you can run this on your own DO function.

## Deploy changes

Run `npm run deploy` this will update the `gh-pages` pages branch. 
Create a pull request to [JACoW-org/catscan](https://github.com/JACoW-org/catscan-interface) who hosts the GitHub pages.

