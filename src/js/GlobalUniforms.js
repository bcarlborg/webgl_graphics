export default class GlobalUniforms {
  constructor() {
    if (GlobalUniforms.instance) return GlobalUniforms.instance;
    GlobalUniforms.instance = this;

    this.globalUniforms = {
      individual: {},
      block: {},
    };
  }

  setUniform(uniformName, value) {
    this.globalUniforms.individual[uniformName] = value;
  }

  setManyUniforms(incomingUniforms) {
    Object.assign(this.globalUniforms.individual, incomingUniforms);
  }

  setBlockUniforms(blockName, incomingUniforms) {
    if (!(this.globalUniforms.block[blockName])) {
      this.globalUniforms.block[blockName] = {};
    }
    Object.assign(this.globalUniforms.block[blockName], incomingUniforms);
  }
}
