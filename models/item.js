const mongoose = require('mongoose');

module.exports = mongoose.model("Item", {
  title: String,
  content: String,
  link: String,
  author: String,
  updated: Date
});
