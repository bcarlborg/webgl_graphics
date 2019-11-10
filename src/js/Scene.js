import * as twgl from '../lib/twgl-full.module.js';

export default class Scene {
  constructor(gl) {
    this.gl = gl;
    this.initGl();
  }

  clearBackground() {
  }

  resize(gl, canvas) {
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  update() {
    this.clearBackground();
  }
}
