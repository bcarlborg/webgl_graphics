import * as twgl from '../lib/twgl-full.module.js';

export default class Geometry {
  constructor(gl, vertices, options) {
    this.gl = gl;
    this.vertices = vertices;
    this.options = options;
    this.bufferInfo = null;

    this.addAdditionalInfoToVerts();
    this.initalizeBufferInfo();
  }

  addAdditionalInfoToVerts() {
    twgl.primitives.makeRandomVertexColors(this.vertices);
  }

  initalizeBufferInfo() {
    twgl.attributes.setAttributePrefix('a_');

    if (this.options && this.options['2d']) {
      twgl.primitives.createXYQuadBufferInfo(this.gl);
    } else {
      this.bufferInfo = twgl.createBufferInfoFromArrays(this.gl, this.vertices);
    }
  }
}
