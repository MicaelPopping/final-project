class CameraTop extends Camera {

    constructor(gl) {

        super(gl);
    }

    process(object) {

        this.position = [object.translate[0], 10, object.translate[2]];
        this.target = [object.translate[0], 1, object.translate[2] + 3];
    }   
}