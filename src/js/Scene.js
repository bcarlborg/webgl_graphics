import * as twgl from '../lib/twgl-full.module.js';
import glMatrix from './helpers/glm.js';

export default class Scene {
  constructor(gl, canvas) {
    this.canvas = canvas;
    this.gl = gl;
    this.init(canvas);
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

    this.angle = new Date() / 1000 / 6 * 2 * Math.PI;
    glMatrix.mat4.rotate(this.uniforms.mWorld, this.identity, this.angle, [0, 1, 0]);
    glMatrix.mat4.perspective(
      this.uniforms.mProj,
      glMatrix.glMatrix.toRadian(45),
      this.canvas.width / this.canvas.height,
      0.1, 1000.0,
    );

    twgl.setBuffersAndAttributes(gl, this.programInfo, this.bufferInfo);
    twgl.setUniforms(this.programInfo, this.uniforms);
    twgl.drawBufferInfo(gl, this.bufferInfo);
  }

  init() {
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

    const mWorld = new Float32Array(16);
    const mView = new Float32Array(16);
    const mProj = new Float32Array(16);

    glMatrix.mat4.identity(mWorld);
    glMatrix.mat4.identity(mView);
    glMatrix.mat4.identity(mProj);

    glMatrix.mat4.lookAt(mView, [0, 0, -5], [0, 0, 0], [0, 1, 0]);
    glMatrix.mat4.perspective(
      mProj, glMatrix.glMatrix.toRadian(45), this.canvas.width / this.canvas.height, 0.1, 1000.0,
    );

    this.uniforms = { mWorld, mView, mProj };
    this.angle = performance.now() / 1000 / 6 * 2 * Math.pi;

    this.identity = new Float32Array(16);
    glMatrix.mat4.identity(this.identity);
  }
}
