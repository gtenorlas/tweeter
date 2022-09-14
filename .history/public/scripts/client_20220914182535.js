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

const resetTweets = () => {
  $("article").remove();
  $("#tweet-form")[0].reset();
  $("#counter").text("140");
  animateError($("#h4-section-error"), null, true);
}

/*
Escape function to preventing XSS
*/
const escapeXSS = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
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
        ${escapeXSS(tweet.content.text)}
      </h4>
      <hr />
      <footer class="article-footer">
        <span>${timeago.format(tweet.created_at)}</span>
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

const validateForm = (text) => {
  const MAX_CHARS_ALLOWED = 140;
  const $h4 = $("#h4-section-error");

  if (text.length > MAX_CHARS_ALLOWED) {
    animateError($h4, "Your tweet is longer than the maximum allowed.", false)
    return false;
  } else if (!text.trim()) {
    animateError($h4, "You must enter a tweet.", false)
    return false;
  }
  return true;
}

/*
Helper functiont to animate the node to slide up and slide down

toHide -> true will hide the object, false will animate the object
message -> the error message that will be displayed on screen
$node -> the element
*/
const animateError = ($node, message, toHide) => {
  if (toHide) {
    $node.hide();
    return;
  }
  $node.slideUp("fast");
  $node.empty();
  $node.text(message);
  $node.prepend('<span><i class="fa-solid fa-triangle-exclamation"></i></span>');
  $node.slideDown("slow");
  return;
}


const tweetSubmitEvent = () => {
  $("#tweet-form").submit((event) => {
    event.preventDefault()

    const MAX_CHARS_ALLOWED = 140;
    const text = $("#tweet-text").val();

    if (!validateForm(text)) {
      return;
    }

    const url = "/tweets/";

    $.ajax({
      type: "POST",
      url: url,
      data: { text },
      success: () => {
        resetTweets();
        loadTweets();
      },
      error: (err) => console.error(err),
    })


  })
}

/*
Create hover event on the right nav to animate the angle-down
by adding and removing class related to the animation
*/
const rightNavAnimate = () => {
  $div = $("#div-nav-right");
  $div.hover(() => {
    $("#angle-down").addClass("angle-down-animate");
  }, () => {
    $("#angle-down").removeClass("angle-down-animate");
  });
}

const rightNavClickEvent = () => {
  $div = $("#div-nav-right");

  $div.click(()=>{
    $("section").slideUp
  });
}

const loadTweets = () => {
  const url = "http://localhost:8080/tweets";
  $.ajax(url, { method: 'GET' })
    .then(function (data) {
      renderTweets(data);
    })
    .catch((error) => {
      console.log("Error", error);
    });
}

$(document).ready(function () {

  tweetSubmitEvent();
  loadTweets();
  rightNavAnimate();

});