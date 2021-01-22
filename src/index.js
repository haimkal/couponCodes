const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const couponroutes = require('./middlewares/couponroutes');
const port = 4000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/coupon', couponroutes);
app.listen(port, () => console.log(`Server listening on port ${port}!`));




