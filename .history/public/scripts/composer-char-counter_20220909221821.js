$(document).ready(function() {

  $("#tweet-text").on('click', () => {
    console.log(this); //The this keyword here refers to something else!
  });

});