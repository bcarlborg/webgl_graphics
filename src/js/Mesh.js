import * as twgl from '../lib/twgl-full.module.js';

export default class Mesh {
  constructor(gl, material, vertices) {
    this.gl = gl;
    this.material = material;
    this.vertices = vertices;
    twgl.attributes.setAttributePrefix('a_');
    this.bufferInfo = twgl.createBufferInfoFromArrays(this.gl, this.vertices);
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
