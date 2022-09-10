$(document).ready(function () {

  $("#tweet-text").on('keydown', (event) => {
    //console.log(event.which);
    if (event.which===8) {
      console.log("backspace");

    }
    let counter = Number($("#counter").val());
    const counterOutput = $("#counter");

    if (event.which===8) {
      console.log("backspace");
 1);
    }
    counterOutput.text(counter - 1);
    if (counter < 0) {
      counterOutput.css("color", "red");
    } else {
      counterOutput.css("color", "black");
    }
  });

});