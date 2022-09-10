$(document).ready(function () {

  $("#tweet-text").on('keydown', () => {
    const MAX_CHARS_ALLOWED = 140;

    let counter = MAX_CHARS_ALLOWED - Number($("#tweet-text").val().length);
console.log("val",$("#tweet-text").val());
console.log("length",$("#tweet-text").val().length);

    const counterOutput = $("#counter");

    counterOutput.text(counter);

    if (counter < 0) {
      counterOutput.css("color", "red");
    } else {
      counterOutput.css("color", "black");
    }
  });

});