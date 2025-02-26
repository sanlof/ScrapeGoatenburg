import express from 'express';
import singlePageScrape from '../controller/singlepagescrape.js';

const router = express.Router();

router.get('/:slug', async (req, res) => {
    const { slug } = req.params;
    try {
        const eventData = await singlePageScrape(slug);
        console.log(eventData.link)
        res.render('event.pug', {eventData})

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

export default router;