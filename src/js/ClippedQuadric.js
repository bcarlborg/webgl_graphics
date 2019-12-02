import SceneGraphEntity from './SceneGraphEntity.js';
import GlobalUniforms from './GlobalUniforms.js';
import glMatrix from './helpers/glm.js';

export default class ClippedQuadric extends SceneGraphEntity {
  constructor(index) {
    super();
    this.index = index;
    this.globalUniforms = new GlobalUniforms();
    this.transformMatrix = glMatrix.mat4.create();
    this.surface = glMatrix.mat4.create();
    this.clipper = glMatrix.mat4.create();

    this.uniforms = {
      surface: glMatrix.mat4.create(),
      clipper: glMatrix.mat4.create(),
    };
  }

  setToUnitCylinder() {
    glMatrix.mat4.set(
      this.surface,
      1, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, -1,
    );
    glMatrix.mat4.set(
      this.clipper,
      0, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, -1,
    );
  }

  setToCone() {
    glMatrix.mat4.set(
      this.surface,
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, -1, 0,
      0, 0, 0, 0,
    );
    glMatrix.mat4.set(
      this.clipper,
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, -2,
    );
  }


  transformSurfaceMatrix() {
    const transformableProps = ['clipper', 'surface'];

    transformableProps.forEach((prop) => {
      glMatrix.mat4.copy(
        this.transformMatrix,
        this.worldMatrix,
      );

      glMatrix.mat4.invert(
        this.transformMatrix,
        this.transformMatrix,
      );

      glMatrix.mat4.multiply(
        this.uniforms[prop],
        this[prop],
        this.transformMatrix,
      );

      glMatrix.mat4.transpose(
        this.transformMatrix,
        this.transformMatrix,
      );

      glMatrix.mat4.multiply(
        this.uniforms[prop],
        this.transformMatrix,
        this.uniforms[prop],
      );
    });
  }

  update() {
    super.update();
    this.transformSurfaceMatrix();
    this.globalUniforms.setBlockUniforms(
      `clippedQuadrics[${this.index}]`, this.uniforms,
    );
  }

  draw() {}
}
