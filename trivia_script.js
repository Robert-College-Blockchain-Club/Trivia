// https://github.com/WebDevSimplified/JavaScript-Quiz-App/blob/master/script.js 
import { questions,generateSampleQuestion, getOpenDbQuestions } from "./questions.js"
import {counterStop, counterCall} from "./countdown_timer.js"

import { currentAccount, connectButton, connect } from "./walletConnect.js";


const startButton = document.getElementById("start-btn")
const nextButton = document.getElementById("next-btn")
const questionContainerElement = document.getElementById("question-container")
const questionElement = document.getElementById("question")
const answerButtonsElement = document.getElementById("answer-buttons")
export const timerElement = document.getElementById("countdown")
const scoreCount = document.getElementById("scoreboard")
const notice = document.getElementById("notice"); // will be displayed if wallet isn't connected
const displayResult = document.getElementById("results"); // displaying results of the player in the end
let userTime


startButton.addEventListener("click",startGame)
nextButton.addEventListener("click",()=>{
    currentQuestionIndex++
    setNextQuestion()
})

//const testButton = document.getElementById("test-btn")

let shuffledQuestions, currentQuestionIndex, numCorrect

let final_score = 300
let record = 100 // record of the player (in s)

export async function startGame(){
    //checkConnection();
    questions_list = await getOpenDbQuestions()
    if (window.ethereum !== "undefined") {
        try {
            validatorForGame(await ethereum.request({ method: 'eth_accounts' }), "start");
        }
        catch (error) {
            console.log(error)
        };
    };
}

function validatorForGame(accounts, arg) {
    if (accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts
        walletAlternate(arg);

    }
    else {
        // set up game
        if (currentAccount !== accounts[0]) {
            currentAccount == accounts[0];
        }
        numCorrect = 0;
        notice.classList.add("hide");
        timerElement.classList.add("hide");
        shuffledQuestions = questions_list.sort(() => Math.random() - .5);
        currentQuestionIndex = 0;
        questionContainerElement.classList.remove("hide");
        scoreCount.classList.remove("hide");
        setNextQuestion();
        counterCall();
    };
};

export async function walletAlternate(arg) {
    timerElement.classList.add("hide");
    notice.classList.remove("hide");
    while (connectButton.disabled === false) {
        await connect()
    };
    if (arg === "start") {
        startGame();
    }
    else {
        timerScreen();
    };
};

function setNextQuestion(){
    resetState()
    scoreCount.innerText = numCorrect + "/" + currentQuestionIndex
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question){
    questionElement.innerText = question.prompt //check
    console.log(question)
    question.choices.forEach(choice => {
        const button = document.createElement("button")
        button.innerText = choice
        button.classList.add('btn');
        if(question.choices.indexOf(choice) == question.answer) {
            button.dataset.correct = question.choices.indexOf(choice) == question.answer
        }
        button.addEventListener("click",selectAnswer)
        answerButtonsElement.appendChild(button)
    })

}

function selectAnswer(e){
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    if (!correct) {
        Array.from(answerButtonsElement.children).forEach(button => {
            if (button.dataset.correct) {
                setStatusClass(button, button.dataset.correct)
            }
            button.disabled = true
        });
    }
    else {
        numCorrect += 1;
    }
    setStatusClass(selectedButton, correct)
    /*
    setStatusClass(document.body,correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button,button.dataset.correct)
    })
    */
    nextButton.classList.remove("hide")
    if(shuffledQuestions.length > currentQuestionIndex+1){
        nextButton.classList.remove("hide")
    } else {
        //startButton.innerText = "restart"
        //startButton.classList.remove("hide")
        endGame()
    }
}
async function endGame(){
    userTime = counterStop()
    await addUserToFirebase(getTodayDate(), currentAccount, userTime, numCorrect)
    displayResults()
}
function setStatusClass(element,correct){
    clearStatusClass(element)
    if(correct){
        element.classList.add("correct")
    }
    else {
        element.classList.add("wrong")
    }
}

function resetState(){
    clearStatusClass(document.body)
    nextButton.classList.add("hide")
    while (answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

async function addUserToFirebase(day, address, time, score) {
    const baseDomain = "http://localhost:3000/add_user/"
    const extention = day + "/" + address + "/" + time + "/" + score
    let response = await fetch(baseDomain+extention);
    let data = await response.json()
    return data;
}

function getTodayDate() {
    const date = new Date();
    const formattedDate = date.getDate() + "_" + (date.getMonth()+1) + "_" + date.getFullYear();
    return formattedDate;
}

let questions_list
/*
function _populateQlist(){
    populateQList(questions_list)
}

function populateQList(qList){
    //testButton.classList.add("hide")
    for(let i = 0; i <10;i++){
        qList.push(generateSampleQuestion())
    }
}
_populateQlist()
*/

const qElement = document.getElementById("question-container")

function timerScreen(){
    notice.classList.add("hide");
    qElement.classList.add("hide")
    displayResult.classList.add("hide");
    timerElement.classList.remove("hide")
    nextButton.classList.add("hide")
    scoreCount.classList.add("hide")

    
}

function displayResults() {
    notice.classList.add("hide");
    qElement.classList.add("hide");
    timerElement.classList.add("hide");
    nextButton.classList.add("hide");
    scoreCount.classList.add("hide");

    displayResult.classList.remove("hide");
    document.getElementById("player-score").innerText = final_score;
    document.getElementById("player-time").innerText = record;
    
    setTimeout(() => {
        timerScreen()
    }, 10000);
}

//testButton.addEventListener("click",_populateQlist)
