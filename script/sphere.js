class Sphere {

    constructor(gl) {

        twgl.setAttributePrefix("a_");
        this.bufferInfo = flattenedPrimitives.createSphereBufferInfo(gl, 0.5, 12, 6);
        this.programInfo = twgl.createProgramInfo(gl, [vertexShaderSource, fragmentShaderSource]);
        this.vao = twgl.createVAOFromBufferInfo(gl, this.programInfo, this.bufferInfo);
        this.gl = gl;

        this.uniforms = {
            u_colorMult: [0.25, 0.25, 1.12, 1],
            u_matrix: m4.identity(),
        };

        this.object = null;
        this.speed = 1;
        this.animation = null;
    }

    start() {

        this.object = new ObjectInfo([0, 0.3, 5], [0, 0, 90]);
        this.animation = null;
    }

    process(deltaTime, then) {

        let object = this.object;

        if(this.animation != null) {

            let animating = this.animation.process(then);

            if(animating == -1) {

                object.translate = this.animation.currentPosition;
                object.rotate[0] += deltaTime * 300;
            } else {
                
                object.translate[0] = 0;
                object.translate[1] = 0.3;
                object.translate[2] = this.animation.finalPosition[2] + animating * 10;
                this.animation = null;
            }
            
            return;
        }

        object.translate[2] += deltaTime * 10;
        object.rotate[0] += deltaTime * 300;
    }

    computeMatrix(viewProjectionMatrix) {

        let object = this.object;

        var matrix = m4.translate(viewProjectionMatrix,
            object.translate[0],
            object.translate[1],
            object.translate[2]);
        matrix = m4.xRotate(matrix, degToRad(object.rotate[0]));
        matrix = m4.yRotate(matrix, degToRad(object.rotate[1]));
        return m4.zRotate(matrix, degToRad(object.rotate[2]));
    }

    draw(viewProjectionMatrix) {

        const gl = this.gl;

        gl.useProgram(this.programInfo.program);
        gl.bindVertexArray(this.vao);

        this.uniforms.u_matrix = this.computeMatrix(viewProjectionMatrix);

        twgl.setUniforms(this.programInfo, this.uniforms);
        twgl.drawBufferInfo(gl, this.bufferInfo);
    }

    startJumpAnimation(then) {
        
        if(this.animation == null) {

            let finalPosition = [0, 0.3, this.object.translate[2] + 5];
            this.animation = new JumpAnimation(this.object.translate, finalPosition, then, 1, 7);  
        }
    }
}