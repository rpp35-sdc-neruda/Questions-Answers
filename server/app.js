const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const routers = require('./routes.js');

//MIDDLEWARE
app.use(compression());
app.use(cors());
app.use(express.static(path.join(__dirname, './client/client/dist')));
app.use(express.static(path.join(__dirname, './loaderio-1bac8e51c825e6245be8cb20658e9e92.txt')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   next();
});

//ROUTE
app.use('/qa/questions', routers.questions);
app.use('/qa/answers', routers.answers)

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
module.exports = app;
