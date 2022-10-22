import {startGame} from "./trivia_script.js";

// Set the date we're counting down to
const right_now = new Date()
const trivia_time_today = new Date()
const trivia_hour = 15
const trivia_minute = 4
trivia_time_today.setHours(trivia_hour)
trivia_time_today.setMinutes(trivia_minute)
trivia_time_today.setSeconds(0)
trivia_time_today.setUTCMilliseconds(0)

//console.log("initial _date: "+ _date)
while(right_now.getTime()>trivia_time_today.getTime()){
  trivia_time_today.setDate(trivia_time_today.getDate()+1)
}
//console.log("secondary date: " + _date)

// Update the count down every 1 second
let trivia_time_in_milliseconds = trivia_time_today.getTime()
const x = setInterval(async function() {

  // Get today's date and time
  let now = new Date().getTime();
    
  // Find the distance between now and the count down date
  
  let distance = trivia_time_in_milliseconds - now;

  // When countdown is finished, proceed to the next 24 h 
  if (distance <= 0) {
    // clearInterval(x);
    // document.getElementById("demo").innerHTML = "EXPIRED";
    trivia_time_in_milliseconds += (24 * 60 * 60 * 1000);
    distance = trivia_time_in_milliseconds - now;
    // start the game if timer = 0
    /*await */startGame()
  }
  //count = count + 1
  //console.log(count)


  // Time calculations for days, hours, minutes and seconds
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"
  // document.getElementById("demo").innerHTML = days + "d " + hours + "h "
  // + minutes + "m " + seconds + "s ";

  // Equalize list elements with calculated values for them
  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;

}, 1000);
