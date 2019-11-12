import * as twgl from '../lib/twgl-full.module.js';

export default class GameEntity {
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

  draw(camera) {
    if (camera) {
      Object.assign(this.virtualUniforms, camera.virtualUniforms);
    }
    const meshUniforms = this.mesh.prepareTodraw();
    if (meshUniforms) {
      Object.assign(this.virtualUniforms, meshUniforms);
    }
    twgl.setUniforms(this.mesh.material.programInfo, this.virtualUniforms);
    this.mesh.draw();
  }
}
