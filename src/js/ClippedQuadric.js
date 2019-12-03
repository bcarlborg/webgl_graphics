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
      color: glMatrix.vec3.create(),
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

  setToSphere() {
    glMatrix.mat4.set(
      this.surface,
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, -4,
    );
    glMatrix.mat4.set(
      this.clipper,
      0, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, -4,
    );
  }


  setToHorizontalCone() {
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
      0, 0, 1, 2,
      0, 0, 0, -0.0001,
    );
  }

  setToInfinitePlane() {
    glMatrix.mat4.set(
      this.surface,
      0, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, -1,
    );
    glMatrix.mat4.set(
      this.clipper,
      0, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, -8,
    );
  }

  setColor(r, g, b) {
    glMatrix.vec3.set(
      this.uniforms.color, r, g, b,
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
