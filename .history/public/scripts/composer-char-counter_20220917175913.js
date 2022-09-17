/*
Handle event for text-area to count the amount of characters entered

Should the characters entered is greater than the maximum characters allowed,
then 
*/


$(document).ready(function () {

  $("#tweet-text").on('keyup', (event) => {
    const MAX_CHARS_ALLOWED = 140;
    const counter = MAX_CHARS_ALLOWED - Number($("#tweet-text").val().length) ;
    const $counterOutput = $("#counter");

    $counterOutput.text(counter);

    if (counter < 0) {
      $counterOutput.css("color", "red");
    } else {
      $counterOutput.css("color", "black");
    }
  });

});