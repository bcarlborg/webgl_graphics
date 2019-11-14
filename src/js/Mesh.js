import * as twgl from '../lib/twgl-full.module.js';

export default class Mesh {
  constructor(gl, material, geometry) {
    this.gl = gl;
    this.material = material;
    this.geometry = geometry;
    this.bufferInfo = twgl.createBufferInfoFromArrays(this.gl, this.geometry);
  }

  prepareTodraw() {
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);

    const materialUniforms = this.material.prepareTodraw();
    twgl.setBuffersAndAttributes(this.gl, this.material.programInfo, this.bufferInfo);
    return materialUniforms;
  }

  draw() {
    twgl.drawBufferInfo(this.gl, this.bufferInfo);
  }
}
