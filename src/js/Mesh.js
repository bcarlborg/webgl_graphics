import * as twgl from '../lib/twgl-full.module.js';

export default class Mesh {
  constructor(gl, material, geometry) {
    this.gl = gl;
    this.material = material;
    this.geometry = geometry;
    this.bufferInfo = twgl.createBufferInfoFromArrays(this.gl, this.geometry);
  }

  // returns any uniforms that should be set
  prepareTodraw() {
    // sets some basic gl display properties
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);

    // prepares material and gets any uniforms that should be drawn
    const materialUniforms = this.material.prepareTodraw();

    // set buffers and attribs
    twgl.setBuffersAndAttributes(this.gl, this.material.programInfo, this.bufferInfo);

    // returns uniforms to be set
    return materialUniforms;
  }

  draw() {
    twgl.drawBufferInfo(this.gl, this.bufferInfo);
  }
}
