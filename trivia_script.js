// https://github.com/WebDevSimplified/JavaScript-Quiz-App/blob/master/script.js 
import { questions,generateSampleQuestion } from "./questions.js"

const startButton = document.getElementById("start-btn")
const nextButton = document.getElementById("next-btn")
const questionContainerElement = document.getElementById("question-container")
const questionElement = document.getElementById("question")
const answerButtonsElement = document.getElementById("answer-buttons")
const timerElement = document.getElementById("countdown")
const scoreCount = document.getElementById("scoreboard")
startButton.addEventListener("click",startGame)
nextButton.addEventListener("click",()=>{
    currentQuestionIndex++
    setNextQuestion()
})

//const testButton = document.getElementById("test-btn")

let shuffledQuestions, currentQuestionIndex, numCorrect
export function startGame(){
    //console.log("start game triggered")
    numCorrect = 0
    timerElement.classList.add("hide")
    //startButton.classList.add("hide")
    shuffledQuestions = questions_list.sort(() => Math.random()-.5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove("hide")
    scoreCount.classList.remove("hide")
    setNextQuestion()
}

function setNextQuestion(){
    resetState()
    scoreCount.innerText = numCorrect + "/" + currentQuestionIndex
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
    if(correct){
        numCorrect += 1
    }
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
_populateQlist()
const qElement = document.getElementById("question-container")
function timerScreen(){
    qElement.classList.add("hide")
    timerElement.classList.remove("hide")
    nextButton.classList.add("hide")
    scoreCount.classList.add("hide")
}

//testButton.addEventListener("click",_populateQlist)
