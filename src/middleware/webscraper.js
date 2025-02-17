import axios from "axios";
import express from "express";
import * as cheerio from 'cheerio';
import fs from "node:fs/promises";
import puppeteer from "puppeteer";
import { SiteLoader } from './../models/SiteLoader.js';

const route = express.Router();


let eventResults = []

const scrape = new SiteLoader('https://www.goteborg.com/evenemang');
await scrape.startPuppeteer()
await scrape.goToPage();
await scrape.setViewport(1080, 1024)
await scrape.evaluatePage('button', 'Acceptera alla')
await scrape.evaluatePage('button', 'Visa alla evenemang')
await scrape.evaluatePage('button', 'Tillbaka till start');
await scrape.page.screenshot('screenshot.png');
await scrape.closeBrowser();

export default eventResults;


async function getContent() {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.goteborg.com/evenemang', { waitUntil: 'networkidle2'});

    await page.setViewport({width: 1080, height: 1024});

    const cookieButton = await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button')); // Get all buttons
       const cookieButton = buttons.find(button => button.textContent.trim() === 'Acceptera alla');
        if(cookieButton)
            {
                cookieButton.click();
                console.log('clicked cookie button');
                }  else {
                console.log('cookie button not found')
            }
    });

    console.log('cookie-button');

    const showAllButton = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button')); // Get all buttons
    const showAllButton = buttons.find(button => button.textContent.trim() === 'Visa alla evenemang'); 
    if (showAllButton) {
        showAllButton.click();
        console.log('Button clicked!');
      } else {
        console.log('button not clicked');
      }
     
  });
    console.log('showallbutton pressed')

    const backToStartButton = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('btn--theme-link')); // Get all buttons
      const backToStartButton = buttons.find(button => button.textContent.trim() === 'Tillbaka till start'); 
      if(backToStartButton)
          {
              console.log('back to start arrived');
              }  else {
              console.log('back to start not found');
          }
  });


  console.log('back-to-start-button identified')

    // page.screenshot({ path: 'screenshot.png' });
    console.log('image saved');
    const htmlContent = await page.content();



  console.log('page loaded')

  const $ = cheerio.load(htmlContent);

            
  $('.event-card__body').each((index, element) => {
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
 

await browser.close();

  }


   
    







    //title = event-card__title
    //link = event-card__body div.space-y-1 a.stretched-link
    //datum = div.v-stack c-icon__title (ersätt idag med Date.now())
    //location = div.v-stack c-icon__title (loopa?)
