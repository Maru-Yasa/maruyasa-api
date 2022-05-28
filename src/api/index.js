const express = require('express');
const emojis = require('./emojis');
const router = express.Router();

const auth = require('./auth')
const post = require('./post')

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/emojis', emojis);
router.use('/auth', auth)
router.use('/post',post)

module.exports = router
