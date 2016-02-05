"use strict";

const express = require('express');
const http = require('http');
const request = require('request');
const router = express.Router();

const User = require('../models/user');

router.get('/checkname/:username', checkName);
router.get('/feeds', getFeeds);
// router.all('*', requireAuth, loadUser);

module.exports = router;


function getFeeds(req, res) {
  request(req.query.url, function (err, resp, body) {
    if(err) {
      res.setHeader('content-type', 'application/json');
      res.status(500);
      return res.end(JSON.stringify({"status":"error","status_message":"Query was unsuccessful"}));
    }
    res.send(body);
  })
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
