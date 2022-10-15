// https://github.com/WebDevSimplified/JavaScript-Quiz-App/blob/master/script.js 
import { questions,generateSampleQuestion } from "./questions.js"

//const startButton = document.getElementById("start-btn")
const nextButton = document.getElementById("next-btn")
const questionContainerElement = document.getElementById("question-container")
const questionElement = document.getElementById("question")
const answerButtonsElement = document.getElementById("answer-buttons")
const timerElement = document.getElementById("countdown")
const connectButton = document.getElementById("connect-btn")
//startButton.addEventListener("click",startGame)
nextButton.addEventListener("click",()=>{
    currentQuestionIndex++
    setNextQuestion()
})

connectButton.addEventListener("click",connect)
//const testButton = document.getElementById("test-btn")

let shuffledQuestions, currentQuestionIndex

export function startGame(){
    //console.log("start game triggered")
    _populateQlist()
    timerElement.classList.add("hide")
    //startButton.classList.add("hide")
    shuffledQuestions = questions_list.sort(() => Math.random()-.5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove("hide")
    setNextQuestion()
}

function setNextQuestion(){
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question){
    questionElement.innerText = question.prompt //check
    question.choices.forEach(choice => {
        const button = document.createElement("button")
        button.innerText = choice
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
    setStatusClass(document.body,correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button,button.dataset.correct)
    })
    nextButton.classList.remove("hide")
    if(shuffledQuestions.length > currentQuestionIndex+1){
        nextButton.classList.remove("hide")
    } else {
        //startButton.innerText = "restart"
        //startButton.classList.remove("hide")
        timerScreen()
    }
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



const questions_list = []
function _populateQlist(){
    populateQList(questions_list)
}
function populateQList(qList){
    //testButton.classList.add("hide")
    for(let i = 0; i <10;i++){
        qList.push(generateSampleQuestion())
    }
}
const qElement = document.getElementById("question-container")
function timerScreen(){
    qElement.classList.add("hide")
    timerElement.classList.remove("hide")
    nextButton.classList.add("hide")
}
async function connect(){
    if(typeof window.ethereum == "undefined"){
        connectButton.innerText = "Please Install Metamask"
    }
    else{
        const accounts = await ethereum.request({ method: "eth_requestAccounts" })
        const account = accounts[0]
        connectButton.innerText = "connected"
    }
}
//testButton.addEventListener("click",_populateQlist)
