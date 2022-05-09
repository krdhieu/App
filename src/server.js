import express from 'express';
require('dotenv').config();
import viewEngine from './configs/viewEngine';
import initRouter from './routes/route';
const app = express();
const port = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
viewEngine(app);

initRouter(app);

app.listen(port, console.log('>>>', port));
