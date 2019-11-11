import * as twgl from '../lib/twgl-full.module.js';

export default class GameEntity {
  // constructor(gl, Mesh) {
  constructor(gl, mesh) {
    this.gl = gl;
    this.mesh = mesh;
    this.virtualUniforms = {};
  }

  setUniforms(uniforms) {
    Object.assign(this.virtualUniforms, uniforms);
  }

  update() {
  }

  draw() {
    this.mesh.prepareTodraw();
    twgl.setUniforms(this.mesh.programInfo, this.virtualUniforms);
    this.mesh.draw();
  }
}
