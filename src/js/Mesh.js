import * as twgl from '../lib/twgl-full.module.js';

export default class Mesh {
  constructor(gl, material, vertices) {
    this.gl = gl;
    this.material = material;
    this.vertices = vertices;

    twgl.attributes.setAttributePrefix('a_');
    this.virtualUniforms = {};
    this.bufferInfo = twgl.createBufferInfoFromArrays(this.gl, this.vertices);
  }

  configureGlSettings() {
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
  }

  draw(incomingUniforms) {
    this.configureGlSettings();
    Object.assign(this.virtualUniforms, incomingUniforms);
    const materialUniforms = this.material.prepareTodraw();
    Object.assign(this.virtualUniforms, materialUniforms);

    twgl.setUniforms(this.material.programInfo, this.virtualUniforms);
    twgl.setBuffersAndAttributes(this.gl, this.material.programInfo, this.bufferInfo);
    twgl.drawBufferInfo(this.gl, this.bufferInfo);
  }
}
