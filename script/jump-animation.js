class JumpAnimation {

    constructor(distance, time, jumpLevel, initialTime) {

        this.time = time;
        this.initial = initialTime;
        this.final = initialTime + time;
        this.currentDistance = 0;
        this.currentHeight = 0;
        this.curve = new BSpline([[0, 1],  [distance / 2, jumpLevel], [distance, 1]], 3);
    }

    process(then) {

        if(then >= this.final)
            return then - this.finalPosition;
        
        let deltaTime = then - this.initialTime;
        let t = deltaTime / this.time;

        let result =  this.curve.calcAt(t);
        
        this.currentDistance = result[0];
        this.currentHeight = result[1];

        return -1;
    }
}