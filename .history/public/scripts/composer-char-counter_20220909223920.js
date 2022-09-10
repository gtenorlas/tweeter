$(document).ready(function() {

  $("#tweet-text").on('keypress', () => {
    let counter = Number($("#counter").text);
    const counterOutput = $("#counter");
    counterOutput.text = counter - 1;
  });

});