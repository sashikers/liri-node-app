console.log('this is loaded');

var twitter = require("twitter");
var spotify = require("node-spotify-app");
var request = require("request");

var twitterKeys = {
  consumer_key: '<input here>',
  consumer_secret: '<input here>',
  access_token_key: '<input here>',
  access_token_secret: '<input here>',
}

module.exports = twitterKeys;