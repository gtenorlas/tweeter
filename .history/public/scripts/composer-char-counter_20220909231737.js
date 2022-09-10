$(document).ready(function () {

  $("#tweet-text").on('keypress', (event) => {
    const 

    let counter = Number($("#tweet-text").val().length);
    const counterOutput = $("#counter");

    counterOutput.text(counter);

    if (counter < 0) {
      counterOutput.css("color", "red");
    } else {
      counterOutput.css("color", "black");
    }
  });

});