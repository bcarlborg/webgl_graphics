import ProgramBuilder from './ProgramBuilder.js';
import * as twgl from '../lib/twgl-full.module.js';
import GameTime from './GameTime.js';

export default class Material {
  constructor(gl) {
    this.gl = gl;
    this.programInfo = null;
    this.progBuilder = new ProgramBuilder(this.gl);
    this.virtualUniforms = {};
    this.gameTime = new GameTime();
    this.virtualUniforms = { u_time: this.gameTime.timeInfo.t };
  }

  update() {
    this.virtualUniforms.u_time = this.gameTime.timeInfo.t;
  }

  fileNameToPath(name) {
    return `../media/${name}`;
  }

  setProgram(vsName, fsName) {
    this.programInfo = this.progBuilder.buildProgram(vsName, fsName);
  }

  buildTextureFromImage(imageFileName) {
    const filePath = this.fileNameToPath(imageFileName);
    return twgl.createTexture(
      this.gl, { src: filePath, mag: this.gl.NEAREST },
    );
  }

  buildSkyBoxTexture(textureFiles) {
    const fullPaths = textureFiles.map(this.fileNameToPath);
    return twgl.createTexture(
      this.gl, { target: this.gl.TEXTURE_CUBE_MAP, src: fullPaths },
    );
  }

  setToWoodenMaterial() {
    this.setProgram('wood-vs.glsl', 'wood-fs.glsl');
    this.virtualUniforms = {
      u_darkWoodColor: [0.43, 0.20, 0.03],
      u_lightWoodColor: [0.76, 0.61, 0.34],
    };
  }

  setToTestMaterial() {
    this.setProgram('procedural/test-vs.glsl', 'procedural/test-fs.glsl');
  }

  setToBasicMaterial() {
    this.setProgram('base-vs.glsl', 'base-fs.glsl');
    this.virtualUniforms = {};
  }

  setToTexturedMaterial(textureFile) {
    this.setProgram('texture-vs.glsl', 'texture-fs.glsl');
    this.virtualUniforms.u_textureImage = this.buildTextureFromImage(textureFile);
  }

  setToInfiniteGroundMaterial(textureFile) {
    this.setProgram('infinite-ground-vs.glsl', 'infinite-ground-fs.glsl');
    this.virtualUniforms.u_textureImage = this.buildTextureFromImage(textureFile);
  }

  setToSkyBoxMaterial(textureFiles) {
    this.programInfo = this.progBuilder.buildProgram('skybox-vs.glsl', 'skybox-fs.glsl');
    this.virtualUniforms.skyboxTexture = this.buildSkyBoxTexture(textureFiles);
  }
}
