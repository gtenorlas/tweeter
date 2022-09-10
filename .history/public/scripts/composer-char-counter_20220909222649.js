$(document).ready(function() {

  $("#tweet-text").on('keypress', () => {
    console.log(this.); //The this keyword here refers to something else!
  });

});