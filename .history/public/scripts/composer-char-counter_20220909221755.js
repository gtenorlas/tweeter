$(document).ready(function() {

  $("#btn").on('click', () => {
    console.log(this); //The this keyword here refers to something else!
  });
  
});