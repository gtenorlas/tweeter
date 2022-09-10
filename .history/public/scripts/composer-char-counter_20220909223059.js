$(document).ready(function() {

  $("#tweet-text").on('keypress', () => {
    console.log(this["textarea"].main.val()); //The this keyword here refers to something else!
  });

});