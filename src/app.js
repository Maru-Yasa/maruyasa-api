const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser')

const passport = require('./auth')
const User = require('./models/User')

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');
const db = require('./db');

const app = express();

db.on('error', (error) => console.log(error))
db.once('open', () => {
  console.log('MongoDB Connected')
})

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({extended : false}))
app.use(express.json());

app.get('/', (req, res) => {

  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
    req: req.body
  });
});

app.get('/admin', passport.authenticate('jwt', {session : false}),(req,res) => {
  res.json({
    msg : "ok"
  })
})


app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
