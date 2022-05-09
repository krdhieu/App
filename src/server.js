import express from 'express';
require('dotenv').config();

import viewEngine from './configs/viewEngine';
import initRouter from './routes/router';
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
const port = process.env.PORT || 3000;
initRouter(app);
viewEngine(app);


app.listen(port, console.log('>>>', port));
