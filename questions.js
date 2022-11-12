
export class questions {
    constructor(prompt,choices,answer) {
        this.prompt = prompt
        this.choices = choices
        this.answer = answer //0, 1, 2, or 3 | respectively A, B, C, or D
    }
}

// Need to change this
export const generateSampleQuestion = () => {
    let prompt = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    let choices = ["A","B","C","D"]
    let answer = Math.floor(Math.random()*3)+1
    return new questions(prompt,choices,answer)
}
