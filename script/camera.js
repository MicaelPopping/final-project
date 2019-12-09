class Camera {

    constructor(gl, position = [0, 0, 0], target = [0, 0, 0], zNear = 1, zFar = 2000, fieldOfViewRadians = degToRad(60)) {

        this.gl = gl;
        this.position = position;
        this.target = target;
        this.zNear = zNear;
        this.zFar = zFar;
        this.fieldOfViewRadians = fieldOfViewRadians;
    }

    viewProjectionMatrix() {

        var aspect = this.gl.canvas.clientWidth / this.gl.canvas.clientHeight;
        var projectionMatrix = m4.perspective(this.fieldOfViewRadians, aspect, this.zNear, this.zFar);

        var cameraMatrix = m4.lookAt(this.position, this.target, [0, 1, 0]);
        var viewMatrix = m4.inverse(cameraMatrix);

        return m4.multiply(projectionMatrix, viewMatrix);
    }
}