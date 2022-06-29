const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const router = require('./routes.js');

//MIDDLEWARE
app.use(compression());
app.use(cors());
app.use(express.static(path.join(__dirname, './client/client/dist')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   next();
});

//ROUTE
app.use('/qa/questions', router);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
module.exports.app = app;
