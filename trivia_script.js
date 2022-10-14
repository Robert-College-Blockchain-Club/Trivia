// https://github.com/WebDevSimplified/JavaScript-Quiz-App/blob/master/script.js 

const startButton = document.getElementById("start-btn")
const nextButton = document.getElementById("next-btn")
const questionContainerElement = document.getElementById("question-container")
const questionElement = document.getElementById("question")
startButton.addEventListener("click",startGame)
nextButton.addEventListener("click",()=>{
    /*
    currentQuestionIndex++
    setNextQuestion()
    */
})

// let shuffledQuestions, currentQuestionIndex

const startGame = () => {
    startButton.classList.add("hide")
    //shuffledQuestions = questions.sort(() => Math.random()-.5)
    //currentQuestionIndex = 0
    questionContainerElement.classList.remove("hide")
    setNextQuestion()
}

const setNextQuestion = () => {
    resetState()
    showQuestion(/*shuffledQuestions[currentQuestionIndex]*/)
}

const showQuestion = (question) =>{
    questionElement.innerText = question.prompt //check
    question.choices.forEach(choice => {
        const button = document.createElement("button")
        button.innerText = answer.innerTextbutton.classList.add("btn")
        if(question.choices.indexOf(choice) == question.answer) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click",selectAnswer)
        answerButtonsElement.appendChild(button)
    })

}

const selectAnswer = (e) => {
    /*
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body,correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button,button.dataset.correct)
    })
    nextButton.classList.remove("hide")
    if()
    */
}
const setStatusClass = (element,correct) => {
    clearStatusClass(element)
    if(correct){
        element.classList.add("correct")
    }
    else {
        element.classList.add("wrong")
    }
}

const resetState = () => {
    nextButton.classList.add("hide")
    while (answerButonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}
const questions = []