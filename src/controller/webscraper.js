import * as cheerio from 'cheerio';
import puppeteer from "puppeteer";

let scrapedEventData = []

scrapeWebsite();

export default scrapedEventData;

// @TODO: In webscraper.js, when the file consist of a great function that you're calling from inside the same file, you could use an IIFE

// @TODO: It would have been nice with some filtering (date, location etc) in the cheerio part. As it is now, you just take all data.



async function scrapeWebsite() {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try {
    await page.goto('https://www.goteborg.com/evenemang', { waitUntil: 'domcontentloaded'});
    } catch(e) {
        console.error(e);
        await browser.close();
        return;
    }

    await page.setViewport({width: 1080, height: 1024});

    await browser.setCookie(
        {
            name: 'necessary_cookies',
            value: 'true',
            domain: 'https://www.goteborg.com',
        },
        {
            name: 'statistics_cookies',
            value: 'true',
            domain: 'https://www.goteborg.com',
        },
        {
            name: 'marketing_cookies',
            value: 'true',
            domain: 'https://www.goteborg.com',
        }
    );

    await browser.cookies();

    try { 
        await page.evaluate(() => {

        const buttons = Array.from(document.querySelectorAll('button'));
        const showAllButton = buttons.find(button => button.textContent.trim() === 'Visa alla evenemang'); 

        if (showAllButton) {
            showAllButton.click();
            } else {
                throw new error('Visa alla evenemang-button not clicked')
            }
            
        });
    } catch(e) {
        console.error(e)
        await browser.close();
        return;
    }

    const htmlContent = await page.content();

    try {
        const $ = cheerio.load(htmlContent);

        $('.event-card__body').each((index, element) => {
            const title = $(element).find('.heading').text().trim()
            let slug = $(element).find('a.stretched-link').attr('href');
            const link = 'https://www.goteborg.com' + slug;
            const date = $(element).find('.c-icon__title').eq(0).text();
            const location = $(element).find('.c-icon__title').eq(1).text();
            slug = slug.replace('/evenemang/', '').trim();
            slug = slug.replace(/\/$/, '');



//     It's a bit annoying that the time and location share the same place in your page. I had a go at it and made this crude edit of the code.

//     // At webscraper.js:73
//     let date ;
//     if ($(element).find('.c-icon__title').length === 2) {
//         date = $(element).find('.c-icon__title').eq(1).text();
//     }
//     else {
//         date = ""; // Or whatever is suitable
//     }

// // This works only if Goteborg & Co always leave date empty, and always has location data.

// Sure, the data provided and "categorized" in the elements by Goteborg&co is a bit flawed, but it would have been nice with some attempt to solve this problem, at least since you were three in the group.

            const eventData = { 
                'title': title,
                'date': date,
                'location': location,
                'link': link,
                'slug': slug
            }

            scrapedEventData.push(eventData);
        });
    } catch (e) {
        console.error(e)
        await browser.close();
        return;
    }

    await browser.close();
}