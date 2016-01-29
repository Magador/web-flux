"use strict";

const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.post('/signin', signIn);
router.post('/signup', signUp);
router.get('/checkname/:username', checkName);
router.all('*', requireAuth, loadUser);
router.get('/feeds', getFeeds);

module.exports = router;

function signIn(req, res, next) {
  let username = req.body.username || '';
  let password = req.body.password || '';
  User.getAuth(username, password, (err, user) => {
    console.log(user);
    if(user.length) {
      req.session.authentificated = true;
      res.sendStatus(202);
    }
    else
      res.sendStatus(401);
  });
}

function signUp(req, res, next) {
  let username = req.body.username || "";
  let email = req.body.email || "";
  let password = req.body.password || "";
  checkUsername(username, (err, avail) => {
    if(err) return res.status(500).send(err);
    if(!avail) return res.status(204).send("Username not available");
    let newUser = new User({
      username: username,
      email: email,
      password: password
    });
    newUser.save((err, user) => {
      if(err) return res.status(400).send(err);
      req.session.authentificated = true;
      let feeds = user.feeds,
          username = user.username,
          email = user.email;
      res.status(201).send({feeds, username, email});
    })
  })
}

function getFeeds(res, req, next) {
  
}

function checkName(req, res, next) {
  checkUsername(req.params.username, (err, avail) => res.status(err? 500: avail? 202: 204).send(err));
}

function requireAuth(req, res, next) {
  if(!req.session.authentificated) res.sendStatus(401);
  else {
    res.status(200).send(req.store);
  }
}

function loadUser(req, res, next) {

}

function checkUsername(username, cb) {
  User.find({username: username}, (err, user) => cb(err, user && user.length? false: true));
}

function signInUser() {

}
