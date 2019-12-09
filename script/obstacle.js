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

        this.object = null;
    }

    start() {

        this.object = [
            new ObjectInfo([0, 1, 10], [0, 0, 0]),
            new ObjectInfo([0, 1, 15], [0, 0, 0]),
            new ObjectInfo([0, 1, 20], [0, 0, 0]),
            new ObjectInfo([0, 1, 25], [0, 0, 0]),
            new ObjectInfo([0, 1, 30], [0, 0, 0]),
            new ObjectInfo([0, 1, 35], [0, 0, 0]),
            new ObjectInfo([0, 1, 40], [0, 0, 0]),
            new ObjectInfo([0, 1, 45], [0, 0, 0]),
            new ObjectInfo([0, 1, 50], [0, 0, 0]),
            new ObjectInfo([0, 1, 55], [0, 0, 0]),
            new ObjectInfo([0, 1, 60], [0, 0, 0]),
            new ObjectInfo([0, 1, 65], [0, 0, 0]),
            new ObjectInfo([0, 1, 70], [0, 0, 0]),
            new ObjectInfo([0, 1, 75], [0, 0, 0]),
            new ObjectInfo([0, 1, 80], [0, 0, 0]),
            new ObjectInfo([0, 1, 85], [0, 0, 0]),
            new ObjectInfo([0, 1, 90], [0, 0, 0]),
            new ObjectInfo([0, 1, 95], [0, 0, 0]),
            new ObjectInfo([0, 1, 100], [0, 0, 0]),
            new ObjectInfo([0, 1, 105], [0, 0, 0])
        ];
    }

    computeMatrix(viewProjectionMatrix, object) {

        let matrix = m4.translate(viewProjectionMatrix,
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

        for(let i = 0; i < this.object.length; i++) {
            this.uniforms.u_matrix = this.computeMatrix(viewProjectionMatrix, this.object[i]);

            twgl.setUniforms(this.programInfo, this.uniforms);
            twgl.drawBufferInfo(gl, this.bufferInfo);
        }
    }
}