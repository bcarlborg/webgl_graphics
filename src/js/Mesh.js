import * as twgl from '../lib/twgl-full.module.js';

export default class Mesh {
  constructor(gl, programInfo, geometry) {
    this.gl = gl;
    this.programInfo = programInfo;
    this.geometry = geometry;
    this.bufferInfo = twgl.createBufferInfoFromArrays(this.gl, this.geometry);
  }

  prepareTodraw() {
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.useProgram(this.programInfo.program);
    twgl.setBuffersAndAttributes(this.gl, this.programInfo, this.bufferInfo);
  }

  draw() {
    twgl.drawBufferInfo(this.gl, this.bufferInfo);
  }
}
