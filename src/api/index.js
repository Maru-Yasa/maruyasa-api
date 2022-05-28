const express = require('express');
const emojis = require('./emojis');
const router = express.Router();

const auth = require('./auth')

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/emojis', emojis);
router.use('/auth', auth)

module.exports = router;
