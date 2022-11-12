// https://github.com/WebDevSimplified/JavaScript-Quiz-App/blob/master/script.js 
import { questions, generateSampleQuestion } from "./questions.js";
import { currentAccount, connectButton, connect } from "./walletConnect.js";

//const container = document.getElementById("container");
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
export const timerElement = document.getElementById("countdown");
const scoreCount = document.getElementById("scoreboard");

const scoreDisplay = document.getElementById("board"); // fix this

const notice = document.getElementById("notice"); // will be displayed if wallet isn't connected

startButton.addEventListener("click", startGame);


nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion();
});

//const testButton = document.getElementById("test-btn")

let shuffledQuestions, currentQuestionIndex, numCorrect;

/* Setting up the game */
export async function startGame() {
    console.log("start game triggered")
    //checkConnection();
    if (window.ethereum !== "undefined") {
        try {
            validatorForGame(await ethereum.request({ method: 'eth_accounts' }), "start");
        }
        catch (error) {
            console.log(err)
        };
    };

};

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
        console.log("We are connected!");
        numCorrect = 0;
        notice.classList.add("hide");
        timerElement.classList.add("hide");
        scoreDisplay.add("hide"); 
        console.log("Score display hidden!")
        shuffledQuestions = questions_list.sort(() => Math.random() - .5);
        currentQuestionIndex = 0;
        questionContainerElement.classList.remove("hide");
        scoreCount.classList.remove("hide");
        setNextQuestion();
    };
};
export async function walletAlternate(arg) {
    timerElement.classList.add("hide");
    scoreDisplay.add("hide"); // added
    notice.classList.remove("hide");
    //timerElement.classList.remove("hide");
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

function setNextQuestion() {
    resetState();
    scoreCount.innerText = numCorrect + "/" + currentQuestionIndex;
    showQuestion(shuffledQuestions[currentQuestionIndex]);
};

function showQuestion(question) {
    questionElement.innerText = question.prompt; //check
    question.choices.forEach(choice => {
        const button = document.createElement("button");
        button.innerText = choice;
        button.classList.add('btn');
        if (question.choices.indexOf(choice) == question.answer) {
            button.dataset.correct = question.choices.indexOf(choice) == question.answer;
        };
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    });

};

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;

    if (!correct) {
        Array.from(answerButtonsElement.children).forEach(button => {
            if (button.dataset.correct) {
                setStatusClass(button, button.dataset.correct)
            }
            button.disabled = true;
        });
    }
    else {
        numCorrect += 1;
    }
    setStatusClass(selectedButton, correct);

    //if the answer isn't selected, it's made red
    /*
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    */

    nextButton.classList.remove("hide");
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide");
    } else {
        //startButton.innerText = "restart"
        //startButton.classList.remove("hide")
        console.log(currentAccount);
        // timerScreen();
        // console.log("Executed timerscreen function!");
        displayResult();
    };
};

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add("correct");
        console.log("added correct!");
    }
    else {
        element.classList.add("wrong");
        console.log("added wrong");
    };
};

function resetState() {
    //clearStatusClass(document.body)
    nextButton.classList.add("hide");
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    };
};

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
    console.log("removed correct/wrong");
};



//Generates one sample question for now 
const questions_list = [];

function _populateQlist() {
    populateQList(questions_list);
};

function populateQList(qList) {
    //testButton.classList.add("hide")
    for (let i = 0; i < 10; i++) {
        qList.push(generateSampleQuestion());
    };
};
_populateQlist();



/* Return to timer screen */
const qElement = document.getElementById("question-container");
function timerScreen() {
    notice.classList.add("hide");
    qElement.classList.add("hide");
    timerElement.classList.remove("hide");
    nextButton.classList.add("hide");
    scoreCount.classList.add("hide");
    scoreDisplay.add("hide"); // added
};

// Display the result of the player for 10s
function displayResult() {
    // hide everything
    notice.classList.add("hide");
    qElement.classList.add("hide");
    timerElement.classList.add("hide");
    nextButton.classList.add("hide");
    scoreCount.classList.add("hide");

    scoreDisplay.remove("hide"); // added

}

//testButton.addEventListener("click",_populateQlist)
