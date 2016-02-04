"use strict";

const express = require('express');
const router = express.Router();
const colors = require('colors');

const User = require('../models/user');

router.post('/signin', signIn);
router.post('/signup', signUp);
router.post('/signout', signOut);

module.exports = router;

function signIn(req, res) {
  let username = req.body.username || '',
      password = req.body.password || '';

  // if(req.session.authentificated) next();

  User.getAuth(username, password, (err, user) => {
    if(err) {
      console.log(JSON.stringify(err, 2).red);
      return res.sendStatus(500);
    }
    if(user) {
      req.session.authentificated = true;
      let feeds = user.feeds;
      let email = user.email;
      return res.status(202).send({username, feeds, email});
    }
    res.sendStatus(401);
  });
}

function signUp(req, res) {

  let username = req.body.username || "",
      email = req.body.email || "",
      password = req.body.password || "";

  User.checkName(username, (err, avail) => {

    console.log(err, avail);

    if(err) {
      console.error(JSON.stringify(err, 2).red);
      return res.sendStatus(500);
    }
    if(!avail) return res.sendStatus(204);
    let newUser = new User({username, email, password});
    newUser.save((err, user) => {
      if(err) {
        console.error(JSON.stringify(err, 2).red);
        return res.sendStatus(400);
      }
      req.session.authentificated = true;
      let feeds = user.feeds,
          username = user.username,
          email = user.email;
      res.status(201).json({feeds, username, email});
    });
  });
}

function signOut(req, res) {
  if(req.session.authentificated)
    // req.session.store.destroy(req.session.id, (err) => {
    //   if(err) {
    //     return console.log(err);
    //   }
      delete req.session;
    //   res.sendStatus(200);
  //   });
  // else
    res.sendStatus(200);
}
