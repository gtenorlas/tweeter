$(document).ready(function() {

  $("#tweet-text").on('keypress', () => {
    console.log(this["head"]); //The this keyword here refers to something else!
  });

});