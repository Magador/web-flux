const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedSchema = new Schema({
  type: String,
  title: String,
  description: String,
  link: String,
  update: Date,
  author: String,
  items: [{type: mongoose.Schema.Types.ObjectId, ref: "Item"}]
});

module.exports = mongoose.model('Feed', feedSchema);
