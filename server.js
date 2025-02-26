import express from "express";
import path from "path"
import url from "url";
import apiRouter from "./src/routes/api.js";
import eventRouter from "./src/routes/event.js";

const port = 3000;
const app = express();

app.set('view engine', 'pug');
app.set('views', './views/'); 

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, 'public');
app.use(express.static(filePath))

app.use('/', (req, res) => {
    res.status(200),
    res.sendFile(filePath)
})

app.use('/api', apiRouter);

app.use('/event', eventRouter)

// app.use('*', (req, res) => {
//     res.status(404).sendFile(__dirname + '/public/index.html')
// })



app.listen(port, () => {
    console.log(`Servern körs på ${port}`)
})