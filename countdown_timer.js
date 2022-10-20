//import {startGame} from "./trivia_script"
const startButton = document.getElementById("start-btn")
const nextButton = document.getElementById("next-btn")
const questionElement = document.getElementById("question")
const answerButtonsElement = document.getElementById("answer-buttons")
const timerElement = document.getElementById("countdown")
const scoreCount = document.getElementById("scoreboard")
const countdownContainer = document.getElementById("twomin-timer")
const qElement = document.getElementById("question-container")

let timeSeconds = 120
let countdownTime = timeSeconds
let counterInterval
let userTime
let userTimeStart
let userTimeEnd

export function counterCall() { 
    counterInterval = setInterval(counterStart, 1000);
}

function counterStart() {
    countdownContainer.classList.remove("hide")
    let minutes = Math.floor((countdownTime / (60)));
    let seconds = (countdownTime % (60));
    document.getElementById("countdown_minutes").innerText = minutes;
    document.getElementById("countdown_seconds").innerText = seconds; 
    if (countdownTime == timeSeconds) {
        userTimeStart = new Date()
    }
    if (countdownTime == 0) {
        counterStop()
     }
     countdownTime = countdownTime-1
}
export function counterStop() {
    userTimeEnd = new Date()
    userTime = userTimeEnd - userTimeStart
    //document.getElementById("test").innerText = userTime;
    clearInterval(counterInterval);
    countdownContainer.classList.add("hide")
    qElement.classList.add("hide")
    timerElement.classList.remove("hide")
    nextButton.classList.add("hide")
    scoreCount.classList.add("hide")
}
