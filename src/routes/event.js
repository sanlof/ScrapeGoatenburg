import express from 'express';
import singlePageScrape from '../controller/singlepagescrape.js';
import path from "path"
import url from "url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const router = express.Router();

router.get('/:slug', async (req, res) => {
    const { slug } = req.params;
    try {
      const eventData = await singlePageScrape(slug);
        // res.json({ data: eventData });
        // console.log(eventData.text);
        // res.send(eventData.text);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

export default router;