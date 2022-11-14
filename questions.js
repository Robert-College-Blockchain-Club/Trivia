
export class questions {
    constructor(prompt,choices,answer) {
        this.prompt = prompt
        this.choices = choices
        this.answer = answer //0, 1, 2, or 3 | respectively A, B, C, or D
    }
}

export const generateSampleQuestion = () => {
    let prompt = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    let choices = ["A","B","C","D"]
    let answer = Math.floor(Math.random()*3)+1
    return new questions(prompt,choices,answer)
}
const fetchQuestion = async () => {
    const data = await fetch("https://opentdb.com/api.php?amount=10&type=multiple")
    const ret = await data.json()
    return ret;
}
export const getOpenDbQuestions = async () => {
    const qObjects = await fetchQuestion();
    const qArr = qObjects.results;
    const retArr = []
    qArr.forEach(q => {
        let prompt = q.question;
        let answer = Math.floor(Math.random()*3)+1;
        let choices = ["","","",""];
        choices[answer] = q.correct_answer
        let j = 0;
        for(let i = 0; i < choices.length; i++){
            if(i !== answer){
                choices[i] = q.incorrect_answers[j];
                j++;
            }
        }
        let question = new questions(prompt,choices,answer);
        retArr.push(question);
    })
    return retArr;
}