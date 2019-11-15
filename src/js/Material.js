import ProgramBuilder from './ProgramBuilder.js';
import * as twgl from '../lib/twgl-full.module.js';

export default class Material {
  constructor(gl) {
    this.gl = gl;
    this.programInfo = null;
    this.progBuilder = new ProgramBuilder(this.gl);
    this.virtualUniforms = {};
  }

  setProgram(vsName, fsName) {
    this.programInfo = this.progBuilder.buildProgram(vsName, fsName);
  }

  buildTextureFromImage(imageFileName) {
    return twgl.createTexture(
      this.gl,
      { src: `../media/${imageFileName}`, mag: this.gl.NEAREST },
    );
  }

  buildSkyBoxTexture(textureFiles) {
    const fullPaths = textureFiles.map((fileName) => (
      `../media/${fileName}`
    ));

    return twgl.createTexture(
      this.gl,
      { target: this.gl.TEXTURE_CUBE_MAP, src: fullPaths },
    );
  }

  setToBasicMaterial() {
    this.setProgram('base-vs.glsl', 'base-fs.glsl');
    this.virtualUniforms = {};
  }

  setToTexturedMaterial(textureFile) {
    this.setProgram('texture-vs.glsl', 'texture-fs.glsl');
    this.virtualUniforms.foo_texture = this.buildTextureFromImage(textureFile);
  }

  setToSkyBoxMaterial(textureFiles) {
    this.programInfo = this.progBuilder.buildProgram('skybox-vs.glsl', 'skybox-fs.glsl');
    this.virtualUniforms.skyboxTexture = this.buildSkyBoxTexture(textureFiles);
  }
}
