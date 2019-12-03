import GlobalUniforms from './GlobalUniforms.js';
import glMatrix from './helpers/glm.js';

export default class LightSource {
  constructor(index) {
    this.index = index;
    this.foo = 'bar';
    this.globalUniforms = new GlobalUniforms();
    this.uniforms = {
      position: glMatrix.vec4.create(),
      powerDensity: glMatrix.vec3.create(),
    };
  }

  setPowerDensity(r, g, b) {
    glMatrix.vec3.set(
      this.uniforms.powerDensity, r, g, b,
    );
  }

  setLightDirection(x, y, z) {
    glMatrix.vec4.set(
      this.uniforms.position, x, y, z, 0,
    );

    glMatrix.vec4.scale(
      this.uniforms.position,
      this.uniforms.position,
      -1,
    );
  }

  setLightLocation(x, y, z) {
    glMatrix.vec4.set(
      this.uniforms.position, x, y, z, 1,
    );
  }

  update() {
    this.globalUniforms.setBlockUniforms(
      `lights[${this.index}]`, this.uniforms,
    );
  }

  draw() {}
}
