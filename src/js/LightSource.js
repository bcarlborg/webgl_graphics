import GlobalUniforms from './GlobalUniforms.js';
import glMatrix from './helpers/glm.js';

export default class LightSource {
  constructor(index) {
    this.index = index;
    this.foo = 'bar';
    this.globalUniforms = new GlobalUniforms();
    this.uniforms = {
      reverseLightDirection: glMatrix.vec4.create(),
    };
  }

  setLightDirection(x, y, z) {
    glMatrix.vec3.set(
      this.uniforms.reverseLightDirection, x, y, z, 0,
    );

    glMatrix.vec4.scale(
      this.uniforms.reverseLightDirection,
      this.uniforms.reverseLightDirection,
      -1,
    );
  }

  update() {
    this.globalUniforms.setBlockUniforms(
      `lights[${this.index}]`, this.uniforms,
    );
  }

  draw() {}
}
