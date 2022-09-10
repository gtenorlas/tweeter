$(document).ready(function () {

  $("#tweet-text").on('keypress', (event) => {
    const MAX_CHARS_ALLOWED = 140;

    let counter = MAX_CHARS_ALLOWED - Number($("#tweet-text").val().length);
    const counterOutput = $("#counter");

    counterOutput.text(MAX_CHARS_ALLOWED - counter);

    if (counter < 0) {
      counterOutput.css("color", "red");
    } else {
      counterOutput.css("color", "black");
    }
  });

});