/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */




/*
Reset the form to it's original view
*/
const resetTweets = () => {
  $("article").remove();
  $("#tweet-form")[0].reset();
  $("#counter").text("140");
  animateError($("#h4-section-error"), null, true);
}

/*
Escape function to prevent XSS
*/
const escapeXSS = function (str) {
  let $div = document.createElement("div");
  $div.appendChild(document.createTextNode(str));
  return $div.innerHTML;
};


/*
Iterate through all tweets data
and add it to the view
*/
const renderTweets = function (tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container

  //revere to have the newest to the top
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  }
};


/*
Create view for a single tweet
*/
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

/*
Function to validate the amount of characters upon submission
*/
const isFormValid = (text) => {
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
Helper function to animate the node to slide up and slide down

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

/*
Handle submit event in the form.
First, it validates that tweet is not empty and it's not more than the max characters allowed.
Then, it uses ajax to post
Lastly, it reset's the tweet's form and reload the view for all the tweets
*/
const tweetSubmitEvent = () => {
  $("#tweet-form").submit((event) => {
    event.preventDefault()

    const text = $("#tweet-text").val();

    if (!isFormValid(text)) {
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

/*
Handle event when the right nav is clicked to show/hide the form on screen
*/
const rightNavClickEvent = () => {
  const $div = $("#div-nav-right");


  $div.click(() => {
    const $iAngleDown = $("#angle-solid");
    const $section = $("section");
    const $textArea = $("#tweet-text");
    if ($section.is(":visible")) {
      $section.slideUp("slow");
      $iAngleDown.removeClass("fa-angles-up");
      $iAngleDown.addClass("fa-angles-down");
    } else {
      $section.slideDown("slow");
      $iAngleDown.removeClass("fa-angles-down");
      $iAngleDown.addClass("fa-angles-up");
      $textArea.focus();
    }
  });
}

/*
Ajax request to make GET request to retrieve all tweets data
*/
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

/*
Monitor the window scroll to determine the location.
The location will determine wether to hide/show the floating icon at the right-bottom of the screen
*/
const scrollEvent = () => {
  const $window = $(window);

  $window.scroll(() => {
    const $window = $(window);
    const $aFloat = $("#fab-float");
    const $document = $(document);
    const $mainNav = $("#main-nav");
    const TOP_PAGE = 300 + $window.height();
    const BOTTOM_PAGE = $document.height() - 100;
    const CURRENT_LOCATION = $window.scrollTop() + $window.height();


    if (CURRENT_LOCATION > BOTTOM_PAGE) {
      $mainNav.slideUp("fast");
      $aFloat.slideDown("fast");

    } else if (CURRENT_LOCATION < TOP_PAGE) {
      $mainNav.slideDown("fast");
      $aFloat.slideUp("fast");
    }
  });
}

/*
Handle event when the floating fab is clicked to show/hide the form on screen
*/
const fabClickEvent = () => {
  const $a = $("#fab-float");

  $a.click(() => {
    $section = $("section");

    if (!$section.is(":visible")) {
      const $iAngleDown = $("#angle-solid");
      const $mainNav = $("#main-nav");
      $iAngleDown.removeClass("fa-angles-down");
      $iAngleDown.addClass("fa-angles-up");
      $section.slideDown("slow");
      $mainNav.slideDown("fast");

    }

    const $textArea = $("#tweet-text");
    $(this).hide();
    $textArea.focus();


  });
}

/*
Document Ready
*/
$(document).ready(function () {

  tweetSubmitEvent();
  loadTweets();
  rightNavAnimate();
  rightNavClickEvent();
  scrollEvent();
  fabClickEvent();

});