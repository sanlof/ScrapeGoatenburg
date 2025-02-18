import express from 'express';
import scrapedEventData from '../controller/webscraper.js';

const Router = express.Router();

Router.get('/', (req, res) => {
    const eventData = scrapedEventData;
    res.json({ eventData });
});

export default Router;