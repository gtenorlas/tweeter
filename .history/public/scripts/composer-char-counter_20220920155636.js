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

  /*
  Just using keydown to count the number of chars based off a user pressing the keyboard
  is not sufficient enough, as user can highlight more than one characters and just clicking on the backspace,
  this will result of 1 reduction from the counter, but it will not be accurate as it will have more than
  once characters deleted at the same  time, hence keyup event is needed.

  Keydown is necessary because when the user is pressing the keyboard and not letting it go, 
  the counter will still have to function and update it in the screen.

  Can't use the same logic as the one in the keyup event as the lenght 
  */
  $("#tweet-text").on("keydown", (event) => {
    const $counterOutput = $("#counter");
    //check if key is a backspace
    if (event.keyCode === 8) {
      counter++
      if (counter > MAX_CHARS_ALLOWED) {
        counter = MAX_CHARS_ALLOWED;
      }
    } else {
      counter--;
    }
    $counterOutput.text(counter);
    if (counter < 0) {
      $counterOutput.css("color", "red");
    } else {
      $counterOutput.css("color", "black");
    }
  });

});