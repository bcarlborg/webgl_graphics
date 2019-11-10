import * as twgl from '../lib/twgl-full.module.js';
import glMatrix from './helpers/glm.js';

export default class Scene {
  constructor(gl) {
    console.log(glMatrix);
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

    const mWorld = new Float32Array(16);
    const mView = new Float32Array(16);
    const mProj = new Float32Array(16);

    glMatrix.mat4.identity(mWorld);
    glMatrix.mat4.identity(mView);
    glMatrix.mat4.identity(mProj);
    // glMatrix.lookAt(mView, [0, 0, -5], [0,0,0], [0,1,0]);
    // glMatrix.mat4.perspective(mProj );

    const uniforms = { mWorld, mView, mProj };

    twgl.setBuffersAndAttributes(gl, this.programInfo, this.bufferInfo);
    twgl.setUniforms(this.programInfo, uniforms);
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
