$(document).ready(function() {

  $("#tweet-text").on('keypress', () => {
    console.log(this[document]); //The this keyword here refers to something else!
  });

});