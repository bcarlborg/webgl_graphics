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
    const materialUniforms = this.material.prepareTodraw();
    twgl.setBuffersAndAttributes(this.gl, this.material.programInfo, this.bufferInfo);
    return materialUniforms;
  }

  draw() {
    twgl.drawBufferInfo(this.gl, this.bufferInfo);
  }
}
