"use strict";

const mongoose = require('mongoose');
const crypto = require('crypto');
const config = require('../config');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: '{PATH} is required!',
    minlength: [4, 'The value of path `{PATH}` (`{VALUE}`) is shorter than the minimum allowed length ({MINLENGTH}).'],
    trim: true,
    index: {
      unique: true
    }
  },
  email: {
    type: String,
    lowercase: true,
    match: [/.+@.+/, "This is not a valid email address"],
    required: '{PATH} is required!',
    trim: true
  },
  password: {
    type: String,
    required: '{PATH} is required!',
    minlength: [4, 'The value of path `{PATH}` (`{VALUE}`) is shorter than the minimum allowed length ({MINLENGTH}).'],
    set: hashPassword
  },
  feeds: [{type: mongoose.Schema.Types.ObjectId, ref: 'Feed'}]
});

userSchema.statics.getAuth = function(name, pass, cb) {
  return this.find({username: name, password: hashPassword(pass)}, cb);
}

module.exports = mongoose.model("User", userSchema);

function hashPassword(pwd) {
  let hash = crypto.createHash('sha256');
  hash.update(config.db[config.env].salt);
  return hash.digest('hex');
}
