# ScrapeGoatenburg
This is a Node.js app built with [Puppeteer](https://www.npmjs.com/package/puppeteer) and [Cheerio](https://www.npmjs.com/package/cheerio) that scrapes event data from websites and presents them in a friendly, easy-to-read interface. It currently scrapes the data of [Göteborg&co](https://www.goteborg.com/evenemang). We us Puppeteer to load the relevant page and capture the data and Cheerio to loop through the data and save it to our API endpoint. We then present it on a page where the user can scan through the events and click through to the event's webpage.

## Features
* The scraper uses Puppeteer to access the webpage. Puppeteer also sets the specified viewport size and sets cookies.
* The app then uses Puppeteer to click through to the relevant page. In this case it clicks on a button called 'Visa alla evenemang' (Show all events).
* Using Cheerio, the app then scrapes elements (in the current use case divs) and finds the following data for the events: title, date, location and link. The link that is scraped is then concatenated with the base url [https://www.goteborg.com] when saved.
* The result is saved as an array and exported for use in our API endpoint.

* The app also uses Express to set up routes and seperate the front-end Javascript, HTML and CSS from the back-end Node.js. The app uses Express to set up an API endpoint which is populated with the scraped data. This is then fetched by the front-end Javascript file (```renderer.js```) and looped through on ```public/index.html```.
* The styling on ```index.html``` used JavaScript to generate a selection of random colors and different angled positions to make the events look like post-its on a noticebard. Refresh and you will see new color!

## Tech Stack
* Node.js
* Express
* Puppeteer
* Nodemon (developer)

## Installation & Setup

1. Clone the repository on your local machine in an appropriate folder: ```git clone https://github.com/sanlof/ScrapeGoat.git```
2. Navigate to the folder: ```cd Scrapegoat```
3. Install depencies by running ```npm install```
5. Happy scraping!

## Usage & Configuration
* To run the the code: ```npm start```in your terminal
* If you want to scrape a specific site, edit the: ```await page.goto('<INSERT-URL-HERE>', { waitUntil: 'networkidle2'});```
* If you want to set the different cookies, make sure to edit them in: ```await browser.setCookie```
* Once you've set up the ```browser```and the ```page```consider whether you need to click through the page to load the data you want. For example, in the original code, we find a ```button``` with the text ```'Visa alla evenemang'```. Once this element has been found, it is clicked.
    ```
    try { 
        await page.evaluate(() => {

        const buttons = Array.from(document.querySelectorAll('<SELECTOR>'));
        const showAllButton = buttons.find(button => button.textContent.trim() === '<CONTENT>'); 

        if (showAllButton) {
            showAllButton.click();
            } else {
                throw new error('<CONTENT>-<SELECTOR> not clicked')
            }
            
        });
    } catch(e) {
        console.error(e)
    }
    ```
* Once the page has been loaded and saved in the variable ```htmlContent```, it is time to specify the selectors that you need to find the elements you want to scrape. This might require some detective work on your end, but devtools is very helpful in this required. Look through the markup until you've found what you're looking for. Consider that you first and foremost need a parent element that holds all the other elements you want to scrape. This is the basis for the Cheerio loop.
  
    ```
    $('<PARENT-ELEMENT-SELECTOR>').each((index, element) => {
            const title = $(element).find('<TITLE-SELECTOR>').text().trim()
            let link = $(element).find('<LINK-SELECTOR').attr('href');
            link = '<BASE-URL>' + link;
            const date = $(element).find('<DATE-SELECTOR').eq(0).text();
            const location = $(element).find('<LOCATION-SELECTOR').eq(1).text();
    ```
* In our specific case, the selector for the date element and location element has the same selector and requires a specific code. If your code does not have this specific issue, simply change the code to ```const date/location = $(element).find('SELECTOR').text();```
* Once you've run through the scrape, the array ```scrapedData``` should be populated with the values and the page should load your events!

## Handling Anti-Scraping Measures
* In doing this project, we consulted the robots.txt and made sure not to scrape any of the disallowed URLs.

## Known Issues & Future Development
* We also have had issues with certain elements of the Puppeteer code and have had to refrain from refining it, since it would continuously stop working.
* In the future, we want to look into delays or other techniques that would make the app less likely to send too many requests to the website. We also want to use multiple sources and perhaps fetch different API endpoints to populate our calendar with more data. We are also looking into creating filters, with date, location, cost, etc to display different data. We also want to add a user-generated element, where users can populate the calendar with events, which would require us to build an authentication system and database.

## License
This project is licensed under a MIT license.

## Acknowledgements
* The Puppeteer and Cheerio documentation was very helpful in learning the basic concepts of the packages. We have also used Google and different unnamed LLMs to straighten out concepts and syntax.

### Notes
This is an assignment in Node.js at YRGO Higher Vocational School in Gothenburg.
