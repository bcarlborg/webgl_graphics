import * as twgl from '../lib/twgl-full.module.js';

export default class Geometry {
  constructor(gl, vertices) {
    this.gl = gl;
    this.vertices = vertices;
    twgl.primitives.makeRandomVertexColors(this.vertices);

    twgl.attributes.setAttributePrefix('a_');
    this.bufferInfo = twgl.createBufferInfoFromArrays(this.gl, this.vertices);
  }
}
