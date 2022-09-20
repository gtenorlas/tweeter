/*
Handle event for text-area to count the amount of characters entered

Should the characters entered is greater than the maximum characters allowed,
then the counter will turn red, else, it will be black.
*/


$(document).ready(function () {
  const MAX_CHARS_ALLOWED = 140;
  let counter = MAX_CHARS_ALLOWED;


  /*
  Use keyup event to accurately count the amount of characters inside the 
  text-area by getting the length of its value. This is more accurate when user decides to
  delete a large amount of characters all at once such as high-lighting and then pressing 
  the delete or the backspace.
  */
  $("#tweet-text").on('keyup', () => {

    counter = MAX_CHARS_ALLOWED - Number($("#tweet-text").val().length);
    console.log("counter", counter);
    const $counterOutput = $("#counter");

    $counterOutput.text(counter);

    if (counter < 0) {
      $counterOutput.css("color", "red");
    } else {
      $counterOutput.css("color", "black");
    }
  });

  $("#tweet-text").on("keydown", (event) => {
   
    console.log("counter", counter);
    const $counterOutput = $("#counter");

    $counterOutput.text(counter);
    console.log("which", event.which);
    if (event.which === 'backspace') {
      counter++
    } else {
      counter--;

    }
    if (counter < 0) {
      $counterOutput.css("color", "red");
    } else {
      $counterOutput.css("color", "black");
    }
  });

});