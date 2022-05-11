import express from 'express';
require('dotenv').config();
import cookieParser from 'cookie-parser';
import viewEngine from './configs/viewEngine';
import initRouter from './routes/router';
import moment from 'moment';
const app = express();

app.use(cookieParser());


/// sử dụng moment 
app.use((req, res, next) => {
  res.locals.moment = moment;
  next();
});


app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

// cổng
const port = process.env.PORT || 3000;

initRouter(app);

/// hiện thị bảng
viewEngine(app);




app.listen(port, console.log('>>>', port));
