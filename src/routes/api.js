import express from 'express';
import eventResults from '../middleware/webscraper.js';

const Router = express.Router();

Router.get('/', (req, res) => {
    const eventResultsData = eventResults;
    res.json({ eventResultsData  });
});

export default Router;