import {startGame} from "./trivia_script.js";

// Set the date we're counting down to
var countDownDate = new Date("Oct 11, 2022 19:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();
    
  // Find the distance between now and the count down date

  var distance = countDownDate - now;

  // When countdown is finished, proceed to the next 24 h 
  if (distance <= 0) {
    // clearInterval(x);
    // document.getElementById("demo").innerHTML = "EXPIRED";
    countDownDate += (24 * 60 * 60 * 1000);
    distance = countDownDate - now;

    // start the game if timer = 0
    startGame();
  }


  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"
  // document.getElementById("demo").innerHTML = days + "d " + hours + "h "
  // + minutes + "m " + seconds + "s ";

  // Equalize list elements with calculated values for them
  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;

}, 1000);
