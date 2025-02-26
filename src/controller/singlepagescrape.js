import * as cheerio from 'cheerio';
import puppeteer from "puppeteer";





export default async function singlePageScrape (slug) {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try {
    await page.goto('https://www.goteborg.com/evenemang/' + slug, { waitUntil: 'domcontentloaded'});
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

    const htmlContent = await page.content();

    try {
        const $ = cheerio.load(htmlContent);

    
            const title = $('h1.heading').text().trim()
            // let slug = $(element).find('a.stretched-link').attr('href');
            // const link = 'https://www.goteborg.com' + slug;
            // const date = $(element).find('.c-icon__title').eq(0).text();
            // const location = $(element).find('.c-icon__title').eq(1).text();

        // const ticketLink;
        // const address;
        // const eventSchedule;
        // const content;
        const intro = $('.intro').text().trim();
        const text = $('.post-content.no-padding').html();
        

        const eventData = {
            'title': title,
            // 'date': date,
            // 'location': location,
            // 'link': link,
            'intro': intro,
            'text': text
        }

            return eventData;
        
    } catch (e) {
        console.error(e)
        await browser.close();
        return;
    }

    await browser.close();
}