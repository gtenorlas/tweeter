$(document).ready(function() {

  $("#tweet-text").on('keypress', () => {
    let counter = number($("#counter").val());
    const counterOutput = $(#counter");
    counterOutput.text = counter - 1;
  });

});