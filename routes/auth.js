"use strict";

const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.post('/signin', signIn);
router.post('/signup', signUp);

module.exports = router;

const Auth = {
  signin: function(req, res) {
    let username = req.body.username || '',
        password = req.body.password || '';

    User.getAuth(username, password, (err, user) => {
      if(err) {
        console.error(err);
        res.sendStatus(500);
      }
      if(user.length)
        req.session.authentificated = true;
      res.sendStatus(user.length? 202: 401);
    });
  },
  signout: function(req, res) {
      let username = req.body.username || "",
          email = req.body.email || "",
          password = req.body.password || "";

      
  },
  signup: function(req, res) {

  }
}
