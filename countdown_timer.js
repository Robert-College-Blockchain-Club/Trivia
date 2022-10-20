//import {startGame} from "./trivia_script"

let countdownTime = 120

export function counterStart() {
    while(true) {
        countdownTime = countdownTime-1
        let minutes = Math.floor((countdownTime / (60)));
        let seconds = (countdownTime % (60));

        document.getElementById("countdown_minutes").innerText = minutes;
        document.getElementById("countdown_seconds").innerText = seconds;
    }
   
}
/*
const x = setInterval(function() {
    countdownTime = countdownTime-1
    let minutes = Math.floor((countdownTime / (60)));
    let seconds = (countdownTime % (60));

    document.getElementById("countdown_minutes").innerText = minutes;
    document.getElementById("countdown_seconds").innerText = seconds;
  }, 1000);
  */