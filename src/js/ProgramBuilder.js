import * as twgl from '../lib/twgl-full.module.js';

export default class ProgramBuilder {
  constructor(gl) {
    if (ProgramBuilder.instance) {
      return ProgramBuilder.instance;
    }
    ProgramBuilder.instance = this;

    this.gl = gl;
    this.programs = {};
  }

  buildProgram(vsName, fsName) {
    if (this.haveProgram(vsName, fsName)) {
      return this.programs[vsName][fsName];
    }

    // eslint-disable-next-line
    const shaderSource = ShaderSource.source;
    const programInfo = twgl.createProgramInfo(
      this.gl,
      [shaderSource['base-vs.glsl'], shaderSource['base-fs.glsl']],
    );

    this.addProgram(vsName, fsName, programInfo);
    return this.programs[vsName][fsName];
  }

  haveProgram(vsName, fsName) {
    return (
      vsName in this.programs && fsName in this.programs[vsName]
    );
  }

  addProgram(vsName, fsName, programInfo) {
    if (!(vsName in this.programs)) {
      this.programs[vsName] = {};
    }
    if (!(fsName in this.programs[vsName])) {
      this.programs[vsName][fsName] = programInfo;
    }
  }
}
