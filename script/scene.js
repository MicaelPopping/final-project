class Scene {

    constructor(gl) {
            // Context.
        this.gl = gl;
            // Models.
        this.plane = new Plane(gl);
        this.sphere = new Sphere(gl);
        this.obstacle = new Obstacle(gl);
            // Cameras.
        this.camera = [null, new CameraSphere(gl), new CameraTop(gl)];
        this.current_camera = 1;
            // Time.
        this.then = null;
        this.deltaTime = null;
            // View.
        this.viewProjectionMatrix = null;
            // Input.
        this.keypress = '';

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

        // Processamento dos objetos. &  Lógica do jogo.
        this.sphere.process(this.deltaTime, this.then);
        
        
    }

    processCamera() {
        this.camera[this.current_camera].process(this.sphere.object);
        this.viewProjectionMatrix = this.camera[this.current_camera].viewProjectionMatrix();
    }

    draw() {
        this.plane.draw(this.viewProjectionMatrix);
        this.sphere.draw(this.viewProjectionMatrix);
        this.obstacle.draw(this.viewProjectionMatrix);
    } 

    processInput(key) {

        if(key == ' ')
            this.sphere.startJumpAnimation(this.then);

        else if(key == '1')
            this.current_camera = 1;

        else if(key == '2')
            this.current_camera = 2
    }
}