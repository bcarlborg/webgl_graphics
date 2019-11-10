import * as twgl from '../lib/twgl-full.module.js';

export default class Scene {
  constructor(gl) {
    this.gl = gl;

    this.firstPass();
  }

  clearBackground() {
    this.gl.clearColor(0.1, 0.14, 0.1, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
  }

  resize(gl, canvas) {
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  update() {
    this.clearBackground();
  }

  draw() {
    const { gl } = this;
    gl.useProgram(this.programInfo.program);
    twgl.setBuffersAndAttributes(gl, this.programInfo, this.bufferInfo);
    twgl.drawBufferInfo(gl, this.bufferInfo);
  }

  firstPass() {
    const { gl } = this;

    // eslint-disable-next-line
    const shaderSource = ShaderSource.source;
    this.programInfo = twgl.createProgramInfo(gl,
      [shaderSource['base-vs.glsl'], shaderSource['base-fs.glsl']]);
    const arrays = {
      position: { numComponents: 3, data: [0.0, 0.5, 0.0, -0.5, -0.5, 0.0, 0.5, -0.5, 0.0] },
      vertColor: { numComponents: 3, data: [1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0] },
    };

    this.bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);
  }
}
