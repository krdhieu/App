import express from 'express';
require('dotenv').config();
import expressLayouts from 'express-ejs-layouts';
import viewEngine from './configs/viewEngine';
const app = express();
const port = process.env.PORT || 3001;
viewEngine(app);
app.get('/', (req, res) => {
    res.render('app.ejs');
});

app.listen(port, console.log('>>>', port));
