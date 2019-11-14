import ProgramBuilder from './ProgramBuilder.js';
import * as twgl from '../lib/twgl-full.module.js';

export default class Material {
  constructor(gl) {
    this.gl = gl;
    this.programInfo = null;
    this.progBuilder = new ProgramBuilder(this.gl);
    this.virtualUniforms = {};
  }

  setToBasicMaterial() {
    this.programInfo = this.progBuilder.buildProgram('base-vs.glsl', 'base-fs.glsl');
    this.virtualUniforms = {};
  }

  setToTexturedMaterial(textureFile) {
    this.programInfo = this.progBuilder.buildProgram('texture-vs.glsl', 'texture-fs.glsl');
    this.virtualUniforms.foo_texture = twgl.createTextures(
      this.gl,
      { computerTex: { src: `../media/${textureFile}`, mag: this.gl.NEAREST } },
    ).computerTex;
  }

  setToInfiniteGroundMaterial(textureFile) {
    this.programInfo = this.progBuilder.buildProgram('infinite-ground-vs.glsl', 'infinite-ground-fs.glsl');
    this.virtualUniforms.foo_texture = twgl.createTextures(
      this.gl,
      { computerTex: { src: `../media/${textureFile}`, mag: this.gl.NEAREST } },
    ).computerTex;
  }

  setToSkyBoxMaterial(textureFiles) {
    this.programInfo = this.progBuilder.buildProgram('skybox-vs.glsl', 'skybox-fs.glsl');
    this.virtualUniforms.skyboxTexture = twgl.createTextures(
      this.gl, {
        skyboxTex: {
          target: this.gl.TEXTURE_CUBE_MAP,
          width: 800,
          height: 800,
          src: [
            `../media/${textureFiles[0]}`,
            `../media/${textureFiles[1]}`,
            `../media/${textureFiles[2]}`,
            `../media/${textureFiles[3]}`,
            `../media/${textureFiles[4]}`,
            `../media/${textureFiles[5]}`,
          ],
        },
      },
    ).skyboxTex;
  }

  // return any uniforms to set
  prepareTodraw() {
    this.gl.useProgram(this.programInfo.program);
    return this.virtualUniforms;
  }
}
