class CameraSphere extends Camera {

    constructor(gl) {

        super(gl);
    }

    process(object) {

        this.position = [object.translate[0], object.translate[1] + 3, object.translate[2] - 4];
        this.target = [object.translate[0], 1, object.translate[2] + 5];
    }   
}