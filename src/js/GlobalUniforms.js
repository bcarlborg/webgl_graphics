export default class GlobalUniforms {
  constructor() {
    if (GlobalUniforms.instance) return GlobalUniforms.instance;
    GlobalUniforms.instance = this;

    this.globalUniforms = {};
  }

  setUniform(uniformName, value) {
    this.globalUniforms[uniformName] = value;
  }

  setManyUniforms(incomingUniforms) {
    Object.assign(this.globalUniforms, incomingUniforms);
  }
}
