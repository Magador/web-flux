"use strict";

const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/checkname/:username', checkName);
router.all('*', requireAuth, loadUser);
router.get('/feeds', getFeeds);

module.exports = router;


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
