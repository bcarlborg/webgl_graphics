import GlobalUniforms from './GlobalUniforms.js';
import * as twgl from '../lib/twgl-full.module.js';

export default class Mesh {
  constructor(gl, geometry, material) {
    this.gl = gl;
    this.globalUniforms = new GlobalUniforms();
    this.virtualUniforms = {};
    this.material = material;
    this.geometry = geometry;

    this.bufferInfo = this.geometry.bufferInfo;
    this.vao = twgl.createVAOFromBufferInfo(
      this.gl, this.material.programInfo, this.bufferInfo,
    );
  }

  update() {
    this.material.update();
  }

  configureGlSettings() {
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
  }

  draw(incomingUniforms) {
    this.configureGlSettings();
    Object.assign(this.virtualUniforms, this.material.virtualUniforms);

    this.gl.useProgram(this.material.programInfo.program);
    this.gl.bindVertexArray(this.vao);
    twgl.setUniforms(this.material.programInfo, incomingUniforms);
    twgl.setUniforms(this.material.programInfo, this.material.virtualUniforms);
    twgl.setUniforms(this.material.programInfo, this.virtualUniforms);
    twgl.setUniforms(this.material.programInfo, this.globalUniforms.globalUniforms);
    twgl.drawBufferInfo(this.gl, this.bufferInfo);
  }
}
