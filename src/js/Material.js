import ProgramBuilder from './ProgramBuilder.js';
import * as twgl from '../lib/twgl-full.module.js';

export default class Material {
  constructor(gl) {
    this.gl = gl;
    this.programInfo = null;
    this.progBuilder = new ProgramBuilder(this.gl);
    this.texture = null;
  }

  setToBasicMaterial() {
    this.programInfo = this.progBuilder.buildProgram('base-vs.glsl', 'base-fs.glsl');
  }

  setToTexturedMaterial(textureFile) {
    this.programInfo = this.progBuilder.buildProgram('texture-vs.glsl', 'texture-fs.glsl');
    this.texture = twgl.createTextures(
      this.gl,
      { computerTex: { src: `../media/${textureFile}`, mag: this.gl.NEAREST } },
    ).computerTex;
  }

  // return any uniforms to set
  prepareTodraw() {
    let uniforms = null;
    if (this.texture) {
      uniforms = { foo_texture: this.texture };
    }
    this.gl.useProgram(this.programInfo.program);
    return uniforms;
  }
}
