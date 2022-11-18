import { getOpenDbQuestions } from "./questions.js";
import { counterStop, counterCall } from "./timer/countdown_timer.js";
import { hasPayed, hasERC1155, claim, enterTrivia, amountAvailable } from "./gameCondition.js";
import { currentAccount, connectButton, connect } from "./walletConnect.js";

/* Current button for the user to start the game */
const startButton = document.getElementById("start-btn");
startButton.addEventListener("click", startGame);

/* Button inside the quiz to proceed to the next question */
const nextButton = document.getElementById("next-btn");
nextButton.addEventListener("click", () => { currentQuestionIndex++; setNextQuestion(); })

/* Main container for the quiz */
const questionContainerElement = document.getElementById("question-container");

/* Token claim-related elements */
const claimButton = document.getElementById("claim-btn");
const claimAmount = document.getElementById("claim-amount");
const claimInput = document.getElementById("claim-input");

/* Button to direct the user to the marketplace */
const marketplaceButton = document.getElementById("marketplace-btn");

/* Quiz question and answers */
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

/* Countdown for the next round */
export const timerElement = document.getElementById("countdown");

/* Score of the user while playing the game, i.e. how many correct/wrongs */
const scoreCount = document.getElementById("scoreboard");

/* Will be displayed if the user wallet is not connected or the pre-game conditions aren't satisfied by any chance */
const notice = document.getElementById("notice");
const noticeWarning = document.getElementById("notice-warning");

/* Displays the leaderboard, score and count of that day */
const displayResult = document.getElementById("results");
const leaderboardButton = document.getElementById("leaderboard");

/* Includes start game and connect buttons */
const startAndConnect = document.getElementById("cnn_and_start");

/* Button for the user to make their trivia payment before starting the game */
const triviaPayment = document.getElementById("enter_trivia");
triviaPayment.addEventListener("click", enterTrivia);

/* Init of some key variables */
let userTime, shuffledQuestions, currentQuestionIndex, numCorrect, finalScore;

export async function startGame() {
    questions_list = await getOpenDbQuestions();
    if (window.ethereum !== "undefined") {
        try {
            validatorForGame(await ethereum.request({ method: 'eth_accounts' }), "start");
        }
        catch (error) {
            console.log(error);
        }
    }
}

async function validatorForGame(accounts, arg) {
    console.log("read validator for game");

    // First condition: wallet connected?
    if (accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts
        walletAlternate(arg);
    }
    else {
        // set up game
        if (currentAccount !== accounts[0]) {
            currentAccount == accounts[0];
        }
        //connectButton.innerText = "Connected";
        /*
        numCorrect = 0;
        notice.classList.add("hide");
        timerElement.classList.add("hide");
        shuffledQuestions = questions_list.sort(() => Math.random() - .5);
        currentQuestionIndex = 0;
        questionContainerElement.classList.remove("hide");
        scoreCount.classList.remove("hide");
        setNextQuestion();
        counterCall();
        */

    }

    // Second condition: has the user ERC1155?
    while (!(await hasERC1155(currentAccount))) {
        timerElement.classList.add("hide");
        claimAmount.classList.add("hide");
        claimButton.classList.add("hide");
        claimInput.classList.add("hide");
        leaderboardButton.classList.add("hide");


        notice.classList.remove("hide");
        noticeWarning.innerText = "You do not have any ERC1155 tokens. You can mint some at the marketplace";
        marketplaceButton.classList.remove("hide");

    }

    // Third condition: has the user payed the entry fee to enter the game?
    while (!(await hasPayed(currentAccount))) {
        timerElement.classList.add("hide");
        startAndConnect.classList.add("hide");
        claimAmount.classList.add("hide");
        claimButton.classList.add("hide");
        claimInput.classList.add("hide");
        leaderboardButton.classList.add("hide");

        notice.classList.remove("hide");
        noticeWarning.innerText = "You have not made your payment for today's game. You can make your payment with the button below.";
        marketplaceButton.classList.remove("hide");
        triviaPayment.classList.remove("hide");
    }
    numCorrect = 0;

    notice.classList.add("hide");
    timerElement.classList.add("hide");
    claimAmount.classList.add("hide");
    claimButton.classList.add("hide");
    claimInput.classList.add("hide");
    leaderboardButton.classList.add("hide");

    shuffledQuestions = questions_list.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove("hide");
    scoreCount.classList.remove("hide");

    setNextQuestion();
    counterCall();

}

/**
 * 
 * @param {} arg: start if game should start, not start if it shouldn't
 * calls connect function until connectButton isn't disabled, i.e, if user isn't connected
 * basically calls connect until user is connected
 */
export async function walletAlternate(arg) {
    timerElement.classList.add("hide");
    leaderboardButton.classList.add("hide");
    notice.classList.remove("hide");
    noticeWarning.innerText = "You cannot start the game, your wallet isn't connected!";
    while (connectButton.disabled === false) {
        await connect();
    }
    if (arg === "start") {
        connectButton.add("hide");
        startGame();
    }
    else {
        timerScreen();
    }
}


function setNextQuestion() {
    resetState();
    scoreCount.innerText = numCorrect + "/" + currentQuestionIndex;
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.prompt; //check
    console.log(question);
    question.choices.forEach(choice => {
        const button = document.createElement("button");
        button.innerText = choice;
        button.classList.add('btn');
        if (question.choices.indexOf(choice) == question.answer) {
            button.dataset.correct = question.choices.indexOf(choice) == question.answer;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    })

}


function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (!correct) {
        Array.from(answerButtonsElement.children).forEach(button => {
            if (button.dataset.correct) {
                setStatusClass(button, button.dataset.correct);
            }
            button.disabled = true;
        });
    }
    else {
        numCorrect += 1;
    }
    setStatusClass(selectedButton, correct);
    /*
    setStatusClass(document.body,correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button,button.dataset.correct)
    })
    */
    nextButton.classList.remove("hide");
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide");
    } else {
        endGame();
    }
}

/* Called in the end of the game */
async function endGame() {
    userTime = counterStop();
    await addUserToFirebase(getTodayDate(), currentAccount, userTime, numCorrect);
    displayResults();
}

/* Helps us to display the correct color for user's input, i.e. correct or wrong */
function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add("correct");
    }
    else {
        element.classList.add("wrong");
    }
}

/* Is used when preparing for the next question */
function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add("hide");
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

/* Clears buttons' property of correct/wrong */
function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

async function addUserToFirebase(day, address, time, score) {
    const baseDomain = "http://localhost:3000/add_user/";
    const extention = day + "/" + address + "/" + time + "/" + score;
    let response = await fetch(baseDomain + extention);
    let data = await response.json();
    return data;
}

function getTodayDate() {
    const date = new Date();
    const formattedDate = date.getDate() + "_" + (date.getMonth() + 1) + "_" + date.getFullYear();
    return formattedDate;
}

let questions_list;

const qElement = document.getElementById("question-container");

function timerScreen() {
    notice.classList.add("hide");
    qElement.classList.add("hide");
    displayResult.classList.add("hide");
    nextButton.classList.add("hide");
    scoreCount.classList.add("hide");

    timerElement.classList.remove("hide");
    claimAmount.classList.remove("hide");
    claimButton.classList.remove("hide");
    claimInput.classList.remove("hide");
    leaderboardButton.classList.remove("hide");

}

/* Displays results at the end of the game (time and score) */
function displayResults() {
    notice.classList.add("hide");
    qElement.classList.add("hide");
    timerElement.classList.add("hide");
    nextButton.classList.add("hide");
    scoreCount.classList.add("hide");
    claimAmount.classList.add("hide");
    claimButton.classList.add("hide");
    claimInput.classList.add("hide");

    displayResult.classList.remove("hide");
    leaderboardButton.classList.remove("hide");

    finalScore = numCorrect * 10; // for now, each correct is 10 points
    document.getElementById("player-score").innerText = finalScore;
    document.getElementById("player-time").innerText = userTime;

    setTimeout(() => {
        timerScreen();
    }, 10000);
}

claimButton.addEventListener("click", showClaim)

/* Claim */
async function showClaim() {
    var claimVal = claimInput.value;
    await claim(claimVal);
}
const amount = await amountAvailable();
//console.log(amount)
claimAmount.innerText = ("Amount you can claim:" + amount);
