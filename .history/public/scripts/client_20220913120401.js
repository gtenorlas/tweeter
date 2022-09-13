/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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

const daysDifference = (serialDate) => {
  //The number of milliseconds in one day
  const ONE_DAY = 1000 * 60 * 60 * 24;
  const today = Date.now();
  const difference = Math.abs(serialDate - today);

  //convert back to days
  return Math.round(difference / ONE_DAY);
};

const renderTweets = function (tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container

  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  }
};

const createTweetElement = function (tweet) {
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

$(document).ready(function () {
  renderTweets(data);

  $("#tweet-form").submit((event) => {
    alert("im in submit")
    event.preventDefault()

    const text = $("#tweet-text").val();
    const user = $("#user").val();
    const CDN_API = `http://localhost:8080/?user=${searchTerm}`

    console.log("user",user);
    console.log("text",text);

/*     $.ajax({
      url: CDN_API,
      success: (response) => {
        const libraries = response.results;
        let outputHTML = '';

        for (const library of libraries) {
          outputHTML += `
            <li>
              <a href="${library.latest}">
                ${library.name}
              </a>
            </li>
          `
        }

        $ul.html(outputHTML)
      },
      error: (err) => console.error(err),
    }) */


  })

});