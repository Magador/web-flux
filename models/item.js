const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: String,
  content: String,
  link: String,
  author: String,
  updated: Date
});

module.exports = mongoose.model('Item', itemSchema);
