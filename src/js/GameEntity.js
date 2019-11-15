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

  configureGlSettings() {
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
  }

  addVirtualUniformsFrom(newUniforms) {
    Object.assign(this.virtualUniforms, newUniforms);
  }

  draw(camera) {
    this.configureGlSettings();

    if (camera) this.addVirtualUniformsFrom(camera.virtualUniforms);

    const meshUniforms = this.mesh.prepareTodraw();
    if (meshUniforms) this.addVirtualUniformsFrom(meshUniforms);

    twgl.setUniforms(this.mesh.material.programInfo, this.virtualUniforms);
    this.mesh.draw();
  }
}
