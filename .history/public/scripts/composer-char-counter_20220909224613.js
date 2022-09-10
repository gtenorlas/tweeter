$(document).ready(function() {

  $("#tweet-text").on('keypress', () => {
    let counter = Number($("#counter").val());
    console.log(counter);
    const counterOutput = $("#counter");
    counterOutput.text( counter - 1);
    if (counter<0) {
      counterOutput.css("color","red");
    }
  });

});