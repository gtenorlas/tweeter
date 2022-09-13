/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



import { daysDifference } from './module.js';
const {daysDifference} = require("./helper");


// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1662682320000
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container

  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  }
};

const createTweetElement = function(tweet) {
  const $tweet = `
      <article>
      <header class="article-header">
        <h3 class="article-header-left"><span><img src=${tweet.user.avatars} alt="avatars"/></span>${tweet.user.name}</h3>
        <h3>${tweet.user.handle}</h3>
      </header>
      <h4 class="article-tweet-h4">
        ${tweet.content.text}
      </h4>
      <hr />
      <footer class="article-footer">
        <span>${daysDifference(tweet.created_at)} days ago</span>
        <span class="article-footer-span-right">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-sharp fa-solid fa-heart"></i>
        </span>
      </footer>
      </article>
  `;
  return $tweet;
};

$(document).ready(function() {
  renderTweets(data);
});