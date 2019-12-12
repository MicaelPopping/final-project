class JumpAnimation {

    constructor(initialPosition, finalPosition, initialTime, time, jumpLevel) {

        this.initialPosition = initialPosition;
        this.finalPosition = finalPosition;
        this.initialTime = initialTime;
        this.finalTime = initialTime +  time;
        this.time = time;
        this.currentPosition = null;

        let controlPoint = [0, jumpLevel, (initialPosition[2] + finalPosition[2]) / 2];
        this.curve = new BSpline([initialPosition, controlPoint, finalPosition], 3);
    }

    process(then) {

        if(then >= this.finalTime)
            return then - this.finalTime;
        
        let deltaTime = then - this.initialTime;
        let t = deltaTime / this.time;

        this.currentPosition =  this.curve.calcAt(t);

        return -1;
    }
}