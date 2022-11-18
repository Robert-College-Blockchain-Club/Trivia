const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const timerElement = document.getElementById("countdown");
const scoreCount = document.getElementById("scoreboard");
const countdownContainer = document.getElementById("twomin-timer");
const qElement = document.getElementById("question-container");

let timeSeconds = 120;
let countdownTime = timeSeconds;
let counterInterval;
let userTimeStart;
let userTimeEnd;

export function counterCall() {
    countdownTime = timeSeconds;
    countdownContainer.classList.remove("hide");
    let minutes = Math.floor((countdownTime / (60)));
    let seconds = (countdownTime % (60));
    document.getElementById("countdown_minutes").innerText = minutes;
    document.getElementById("countdown_seconds").innerText = seconds;
    counterInterval = setInterval(counterStart, 1000);
    if (countdownTime == timeSeconds) {
        userTimeStart = new Date();
    }
}

function counterStart() {
    countdownTime = countdownTime - 1;
    countdownContainer.classList.remove("hide");
    let minutes = Math.floor((countdownTime / (60)));
    let seconds = (countdownTime % (60));
    document.getElementById("countdown_minutes").innerText = minutes;
    document.getElementById("countdown_seconds").innerText = seconds;
    if (countdownTime == 0) {
        counterStop();
    }

}
export function counterStop() {
    userTimeEnd = new Date();
    let userTime = (userTimeEnd.getTime() - userTimeStart.getTime()) / 1000;
    clearInterval(counterInterval);
    countdownContainer.classList.add("hide");
    qElement.classList.add("hide");
    //timerElement.classList.remove("hide")
    nextButton.classList.add("hide");
    scoreCount.classList.add("hide");
    return userTime;
}