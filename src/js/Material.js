import ProgramBuilder from './ProgramBuilder.js';
import * as twgl from '../lib/twgl-full.module.js';
import GameTime from './GameTime.js';

export default class Material {
  constructor(gl, vs, fs, uniforms) {
    this.gl = gl;
    this.gameTime = new GameTime();

    this.progBuilder = new ProgramBuilder(this.gl);
    this.programInfo = this.setProgram(vs, fs);

    this.virtualUniforms = { u_time: this.gameTime.timeInfo.t };
    if (uniforms) Object.assign(this.virtualUniforms, uniforms);
  }

  update() {
    this.virtualUniforms.u_time = this.gameTime.timeInfo.t;
  }

  fileNameToPath(name) {
    return `../media/${name}`;
  }

  setProgram(vsName, fsName) {
    return this.progBuilder.buildProgram(vsName, fsName);
  }

  setVirtualUniforms(newUniforms) {
    Object.assign(this.virtualUniforms, newUniforms);
  }

  setTextureFromFile(imageFileName) {
    const filePath = this.fileNameToPath(imageFileName);
    return twgl.createTexture(
      this.gl, { src: filePath, mag: this.gl.NEAREST },
    );
  }

  setSkyBoxTextureFromFiles(textureFiles) {
    const fullPaths = textureFiles.map(this.fileNameToPath);
    const skybox = twgl.createTexture(
      this.gl, { target: this.gl.TEXTURE_CUBE_MAP, src: fullPaths },
    );
    Object.assign(this.virtualUniforms, { u_skybox: skybox });
  }
}
