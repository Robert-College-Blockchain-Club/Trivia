export class questions {
    constructor(prompt, choices, answer) {
        this.prompt = prompt;
        this.choices = choices;
        this.answer = answer; //0, 1, 2, or 3 | respectively A, B, C, or D
    }
}

/* export const generateSampleQuestion = () => {
    let prompt = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    let choices = ["A","B","C","D"]
    let answer = Math.floor(Math.random()*3)+1
    return new questions(prompt,choices,answer)
}
*/

const fetchQuestion = async () => {
    const data = await fetch("https://opentdb.com/api.php?amount=10&type=multiple&encode=base64");
    const ret = await data.json();
    return ret;
}
export const getOpenDbQuestions = async () => {
    const qObjects = await fetchQuestion();
    const qArr = qObjects.results;
    const retArr = [];
    qArr.forEach(q => {
        let prompt = b64_to_utf8(q.question);
        let answer = Math.floor(Math.random() * 3) + 1;
        let choices = ["", "", "", ""];
        choices[answer] = b64_to_utf8(q.correct_answer);
        let j = 0;
        for (let i = 0; i < choices.length; i++) {
            if (i !== answer) {
                choices[i] = b64_to_utf8(q.incorrect_answers[j]);
                j++;
            }
        }
        let question = new questions(prompt, choices, answer);
        retArr.push(question);
    })
    return retArr;
}

// To avoid some gibberish characters in imported questions
function b64_to_utf8(str) {
    return decodeURIComponent(escape(window.atob(str)));
}