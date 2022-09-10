$(document).ready(function () {

  $("#tweet-text").on('keypress', (event) => {
 
    let counter = Number($("#tweet-text").val().length);
    const counterOutput = $("#counter");

    counterOutput

    if (counter < 0) {
      counterOutput.css("color", "red");
    } else {
      counterOutput.css("color", "black");
    }
  });

});