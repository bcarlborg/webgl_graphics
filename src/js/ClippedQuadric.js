import SceneGraphEntity from './SceneGraphEntity.js';
import GlobalUniforms from './GlobalUniforms.js';
import glMatrix from './helpers/glm.js';

export default class ClippedQuadric extends SceneGraphEntity {
  constructor(index) {
    super();
    this.index = index;
    this.globalUniforms = new GlobalUniforms();
    this.uniforms = {
      surface: glMatrix.mat4.create(),
      clipper: glMatrix.mat4.create(),
    };
  }

  setToUnitCylinder() {
    glMatrix.mat4.set(
      this.uniforms.surface,
      1, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, -1,
    );
    glMatrix.mat4.set(
      this.uniforms.clipper,
      0, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, -1,
    );
  }

  update() {
    super.update();
    this.globalUniforms.setBlockUniforms(
      `clippedQuadrics[${this.index}]`, this.uniforms,
    );
  }

  draw() {}
}
