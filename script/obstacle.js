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
        this.index = 0;
    }

    start() {

        this.object = [
            new ObjectInfo([0, 0.5, 30], [0, 0, 0]),
            new ObjectInfo([0, 0.5, 35], [0, 0, 0]),
            new ObjectInfo([0, 0.5, 40], [0, 0, 0]),
            new ObjectInfo([0, 0.5, 45], [0, 0, 0]),
            new ObjectInfo([0, 0.5, 53], [0, 0, 0]),
            new ObjectInfo([0, 0.5, 60], [0, 0, 0]),
            new ObjectInfo([0, 0.5, 67], [0, 0, 0]),
            new ObjectInfo([0, 0.5, 74], [0, 0, 0]),
            new ObjectInfo([0, 0.5, 80], [0, 0, 0]),
            new ObjectInfo([0, 0.5, 85], [0, 0, 0]),
            new ObjectInfo([0, 0.5, 92], [0, 0, 0]),
            new ObjectInfo([0, 0.5, 98], [0, 0, 0]),
            new ObjectInfo([0, 0.5, 105], [0, 0, 0]),
            new ObjectInfo([0, 0.5, 120], [0, 0, 0]),
            new ObjectInfo([0, 0.5, 125], [0, 0, 0]),
            new ObjectInfo([0, 0.5, 130], [0, 0, 0]),
            new ObjectInfo([0, 0.5, 137], [0, 0, 0]),
            new ObjectInfo([0, 0.5, 142], [0, 0, 0]),
            new ObjectInfo([0, 0.5, 150], [0, 0, 0]),
            new ObjectInfo([0, 0.5, 157], [0, 0, 0]),
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

        for(let i = this.index; i < this.object.length; i++) {
            this.uniforms.u_matrix = this.computeMatrix(viewProjectionMatrix, this.object[i]);

            twgl.setUniforms(this.programInfo, this.uniforms);
            twgl.drawBufferInfo(gl, this.bufferInfo);
        }
    }
}