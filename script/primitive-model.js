const vertexShaderSource = `#version 300 es

in vec4 a_position;
in vec4 a_color;

uniform mat4 u_matrix;

out vec4 v_color;

void main() {

  gl_Position = u_matrix * a_position;
  v_color = a_color;
}
`;

const fragmentShaderSource = `#version 300 es
precision mediump float;

in vec4 v_color;

uniform vec4 u_colorMult;

out vec4 outColor;

void main() {
   outColor = v_color * u_colorMult;
}
`;

/**
 * Essa ideia não funcionou.
 */
class PrimitiveModel {

    constructor(gl, bufferInfo, color) {

        twgl.setAttributePrefix("a_");
        this.bufferInfo = bufferInfo;
        this.programInfo = twgl.createProgramInfo(gl, [vertexShaderSource, fragmentShaderSource]);
        this.vao = twgl.createVAOFromBufferInfo(gl, this.programInfo, this.bufferInfo);
        this.gl = gl;

        this.uniforms = {
            u_colorMult: color,
            u_matrix: m4.identity(),
        };

        this.object = [];
    }
}