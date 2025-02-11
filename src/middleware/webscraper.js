import axios from "axios";
import express from "express";
import * as cheerio from 'cheerio';
import fs from "node:fs/promises";

const route = express.Router();

console.log('starting');
let eventResults = []

axios.get('https://www.goteborg.com/evenemang')
    .then(res => {
        const $ = cheerio.load(res.data);
        
        $('.event-card__body').each((index, element) => {
        const title = $(element).find('.event-card__title').text().trim()
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
       

}).catch(err => console.error(err))

export default eventResults;



    //title = event-card__title
    //link = event-card__body div.space-y-1 a.stretched-link
    //datum = div.v-stack c-icon__title (ersätt idag med Date.now())
    //location = div.v-stack c-icon__title (loopa?)
