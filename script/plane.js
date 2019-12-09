class Plane {

    constructor(gl) {

        twgl.setAttributePrefix("a_");
        this.bufferInfo = flattenedPrimitives.createPlaneBufferInfo(
            gl,
            2000,  // width
            2000,  // height
            1,   // subdivisions across
            1,   // subdivisions down
        );
        this.programInfo = twgl.createProgramInfo(gl, [vertexShaderSource, fragmentShaderSource]);
        this.vao = twgl.createVAOFromBufferInfo(gl, this.programInfo, this.bufferInfo);
        this.gl = gl;

        this.uniforms = {
            u_colorMult: [0.54, 0.54, 0.54, 1],
            u_matrix: m4.identity(),
        };

        this.object = new ObjectInfo([500, 0, 500], [0, 0, 0]);
    }

    computeMatrix(viewProjectionMatrix) {

        let object = this.object;

        var matrix = m4.translate(viewProjectionMatrix,
            object.translate[0],
            object.translate[1],
            object.translate[2]);
        matrix = m4.xRotate(matrix, object.rotate[0]);
        return m4.yRotate(matrix, object.rotate[1]);
    }

    draw(viewProjectionMatrix) {

        const gl = this.gl

        gl.useProgram(this.programInfo.program);
        gl.bindVertexArray(this.vao);

        this.uniforms.u_matrix = this.computeMatrix(viewProjectionMatrix);

        twgl.setUniforms(this.programInfo, this.uniforms);
        twgl.drawBufferInfo(gl, this.bufferInfo);
    }
}