const mongoose = require('mongoose');
require('dotenv').config()

const url = process.env.DB_ATLAS 
mongoose.connect(url)
module.exports = mongoose.connection