import express from 'express';
require('dotenv').config();

import viewEngine from './configs/viewEngine';
import initRouter from './routes/router';
import moment from 'moment';
const app = express();

/// sử dụng moment 
app.use((req, res, next) => {
  res.locals.moment = moment;
  next();
});

// truyền dữ liệu express
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// cổng
const port = process.env.PORT || 3000;
/// phần luồng
initRouter(app);

/// hiện thị bảng
viewEngine(app);

///  hiện thị post hiện tại
app.listen(port, console.log('>>>', port));
