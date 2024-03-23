class Player {
    constructor(name) {
        this.name = name;
        this.points = 0;
    }

    answerQuestion(isCorrect) {
        if (isCorrect) {
            this.points++;
        }
    }
}