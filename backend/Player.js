class Player {
    constructor(name) {
        this.name = name;
        this.points = 0;
    }

    setPoints(points) {
        this.points = points;
    }

    getPoints() {
        return this.points;
    }
}
console.log(typeof Player)
module.exports = Player;