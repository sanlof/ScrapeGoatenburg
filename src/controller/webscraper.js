import * as cheerio from 'cheerio';
import puppeteer from "puppeteer";

let scrapedEventData = []

scrapeWebsite();

export default scrapedEventData;

async function scrapeWebsite() {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try {
    await page.goto('https://www.goteborg.com/evenemang', { waitUntil: 'networkidle2'});
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
            let link = $(element).find('a.stretched-link').attr('href');
            link = 'https://www.goteborg.com' + link;
            const date = $(element).find('.c-icon__title').eq(0).text();
            const location = $(element).find('.c-icon__title').eq(1).text();
            const category = $(element).find('.badge>span').text().trim();

            const eventData = { 
                'title': title,
                'date': date,
                'location': location,
                'link': link,
                'category': category
            }

            scrapedEventData.push(eventData);
            console.log(scrapedEventData);
        });
    } catch (e) {
        console.error(e)
        await browser.close();
        return;
    }

    await browser.close();
}