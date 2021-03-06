require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const https = require('https');
const crawlerRoutes = require('./routes/crawler');
const errorHandler = require('./handlers/error');
const userRoutes = require('./routes/user');
const cors = require('cors');
const logoRoutes = require('./routes/logo');
const bookCrawlerRoutes = require('./routes/bookCrawler');
const bookRoutes = require('./routes/book');

app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.use('/crawler', crawlerRoutes);
app.use('/user', userRoutes);
app.use('/logo', logoRoutes);
app.use('/bookCrawler', bookCrawlerRoutes);
app.use('/book', bookRoutes);

app.get('/', (req, res, next) => {
  try {
    res.json('Welcome');
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log('the server has started');
  setInterval(() => {
    https.get('https://limitless-meadow-18984.herokuapp.com');
  }, 1000 * 60 * 15);
});
