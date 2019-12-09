class Obstacle {

    constructor(gl) {

        twgl.setAttributePrefix("a_");
        this.bufferInfo = flattenedPrimitives.createCubeBufferInfo(gl, 1);
        this.programInfo = twgl.createProgramInfo(gl, [vertexShaderSource, fragmentShaderSource]);
        this.vao = twgl.createVAOFromBufferInfo(gl, this.programInfo, this.bufferInfo);
        this.gl = gl;

        this.uniforms = {
            u_colorMult: [1.39, 0, 0, 1],
            u_matrix: m4.identity(),
        };

        this.objects = [];
        this.objects.push(new ObjectInfo([0, 1, 10], [0, 0, 0]))
    }

    computeMatrix(viewProjectionMatrix, object) {

        var matrix = m4.translate(viewProjectionMatrix,
            object.translate[0],
            object.translate[1],
            object.translate[2]);
        matrix = m4.xRotate(matrix, object.rotate[0]);
        return m4.yRotate(matrix, object.rotate[1]);
    }

    draw(viewProjectionMatrix) {

        const gl = this.gl;

        gl.useProgram(this.programInfo.program);
        gl.bindVertexArray(this.vao);

        this.uniforms.u_matrix = this.computeMatrix(viewProjectionMatrix, this.objects[0]);

        twgl.setUniforms(this.programInfo, this.uniforms);
        twgl.drawBufferInfo(gl, this.bufferInfo);
    }
}