class Sphere {

    constructor(gl) {

        twgl.setAttributePrefix("a_");
        this.bufferInfo = flattenedPrimitives.createSphereBufferInfo(gl, 0.3, 12, 6);
        this.programInfo = twgl.createProgramInfo(gl, [vertexShaderSource, fragmentShaderSource]);
        this.vao = twgl.createVAOFromBufferInfo(gl, this.programInfo, this.bufferInfo);
        this.gl = gl;

        this.uniforms = {
            u_colorMult: [0.25, 0.25, 1.12, 1],
            u_matrix: m4.identity(),
        };

        this.object = new ObjectInfo([0, 1, 5], [0, 0, 90]);
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

        //this.translate[0] += then * 0.1;
        //this.rotate[0] = then * 100;

        this.uniforms.u_matrix = this.computeMatrix(viewProjectionMatrix);

        twgl.setUniforms(this.programInfo, this.uniforms);
        twgl.drawBufferInfo(gl, this.bufferInfo);
    }
}