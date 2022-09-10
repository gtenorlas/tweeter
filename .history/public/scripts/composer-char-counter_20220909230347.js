$(document).ready(function () {

  $("#tweet-text").on('keypress', (event) => {
    console.log(event.which);
    if (event)
    let counter = Number($("#counter").val());
    const counterOutput = $("#counter");
    counterOutput.text(counter - 1);
    if (counter < 0) {
      counterOutput.css("color", "red");
    } else {
      counterOutput.css("color", "black");
    }
  });

});