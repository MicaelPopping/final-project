class Scene {

    constructor(gl) {
            // Context.
        this.gl = gl;
            // Models.
        this.plane = new Plane(gl);
        this.sphere = new Sphere(gl);
        this.obstacle = new Obstacle(gl);
            //Cameras.
        this.camera = [null, new CameraSphere(gl)];
            // Time.
        this.then = null;
        this.deltaTime = null;
            // View.
        this.viewProjectionMatrix = null;

        this.plane.start();
        this.sphere.start();
        this.obstacle.start();
    }

    process(now) {

        this.preprocessing();
        this.processTime(now);
        this.processModels();
        this.processCamera();
        this.draw();
    }

    preprocessing() {

        const gl = this.gl;

        webglUtils.resizeCanvasToDisplaySize(gl.canvas);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
    }

    processTime(now) {

        now *= 0.001;
        this.deltaTime = now - this.then;
        this.then = now;
    }

    processModels() {

        // Lógica do jogo.
        const sphere = this.sphere.object;
        
        sphere.translate[2] += this.then * 0.1;
        sphere.rotate[0] = this.then * 100;
    }

    processCamera() {
        this.camera[1].process(this.sphere.object);
        this.viewProjectionMatrix = this.camera[1].viewProjectionMatrix();
    }

    draw() {
        this.plane.draw(this.viewProjectionMatrix);
        this.sphere.draw(this.viewProjectionMatrix);
        this.obstacle.draw(this.viewProjectionMatrix);
    } 
}