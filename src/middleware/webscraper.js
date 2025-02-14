import axios from "axios";
import express from "express";
import * as cheerio from 'cheerio';
import fs from "node:fs/promises";
import puppeteer from "puppeteer";

const route = express.Router();

let eventResults = []





const htmlContent = await getContent();

export default eventResults;

async function getContent() {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.goteborg.com/evenemang');

    await page.setViewport({width: 1080, height: 1024});
    await page.waitForSelector('.btn.btn--theme-link.btn--pill');
    console.log('waited');
    // await page.locator('.btn.btn--theme-link.btn--pill').fill("Visa alla evenemang");
    await page.click('.btn.btn--theme-link.btn--pill');
    console.log('button clicked');
    
// Use page.evaluate to find the button with specific text and click it
//     await page.waitForSelector('button');
//     const button = await page.evaluate(() => {
//     const buttons = Array.from(document.querySelectorAll('button')); // Get all buttons
//     const targetButton = buttons.find(button => button.textContent.trim() === 'Visa alla evenemang'); // Replace 'Click Me' with the button text you're targeting
//   });

//   if (button) {
//     // Click the button if found
//     page.locator(button).click();
//     console.log('Button clicked!');
    

  
  const htmlContent = page.content();
  await browser.close();
  return htmlContent;

}


    const $ = cheerio.load(htmlContent);
            
            $('.image-card-alt__body').each((index, element) => {
            const title = $(element).find('.heading').text().trim()
            let link = $(element).find('a.stretched-link').attr('href');
            link = 'https://www.goteborg.com' + link;
            const date = $(element).find('.c-icon__title').eq(0).text();
            const location = $(element).find('.c-icon__title').eq(1).text();
            
            const eventData = { 
                    'title': title,
                    'date': date,
                    'location': location,
                    'link': link
                }
    
            eventResults.push(eventData);
            
            })
           

    
    







    //title = event-card__title
    //link = event-card__body div.space-y-1 a.stretched-link
    //datum = div.v-stack c-icon__title (ersätt idag med Date.now())
    //location = div.v-stack c-icon__title (loopa?)
