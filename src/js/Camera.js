import PositionableEntity from './PositionableEntity.js';
import GlobalUniforms from './GlobalUniforms.js';
import glMatrix from './helpers/glm.js';

export default class Camera extends PositionableEntity {
  constructor(canvas) {
    super();
    this.canvas = canvas;

    this.cameraUniformsBlockName = 'camera';
    this.cameraUniforms = {
      viewDirectionProjectionInverse: glMatrix.mat4.create(),
      projectionMatrix: glMatrix.mat4.create(),
      viewMatrix: glMatrix.mat4.create(),
      cameraPosition: glMatrix.vec3.create(),
    };

    this.globalUniforms = new GlobalUniforms();
    this.globalUniforms.setBlockUniforms(
      this.cameraUniformsBlockName, this.cameraUniforms,
    );

    this.setPositionInformation({
      location: glMatrix.vec3.fromValues(0, 0, -10),
      forward: glMatrix.vec3.fromValues(0, 0, 1),
      lateral: glMatrix.vec3.fromValues(-1, 0, 0),
      up: glMatrix.vec3.fromValues(0, 1, 0),
    });
  }

  setPerspective() {
    const fov = glMatrix.glMatrix.toRadian(45);
    const aspect = this.canvas.width / this.canvas.height;
    const near = 0.01;
    const far = 10000;

    glMatrix.mat4.perspective(
      this.cameraUniforms.projectionMatrix, fov, aspect, near, far,
    );
  }

  updateUniformsLocally() {
    const { viewDirectionProjectionInverse } = this.cameraUniforms;

    glMatrix.mat4.invert(
      this.cameraUniforms.viewMatrix,
      this.positionMatrix,
    );

    glMatrix.vec3.copy(
      this.cameraUniforms.cameraPosition,
      this.position.location,
    );

    glMatrix.mat4.copy(
      viewDirectionProjectionInverse,
      this.cameraUniforms.viewMatrix,
    );
    // set translation to zero so all that is left is direction
    viewDirectionProjectionInverse[12] = 0;
    viewDirectionProjectionInverse[13] = 0;
    viewDirectionProjectionInverse[14] = 0;

    // view direction projection
    glMatrix.mat4.multiply(
      viewDirectionProjectionInverse,
      this.cameraUniforms.projectionMatrix,
      viewDirectionProjectionInverse,
    );

    // view direction projection inverse
    glMatrix.mat4.invert(
      viewDirectionProjectionInverse,
      viewDirectionProjectionInverse,
    );
  }

  updateGlobalUniforms() {
    this.globalUniforms.setBlockUniforms(
      this.cameraUniformsBlockName, this.cameraUniforms,
    );
  }

  update() {
    super.update();
    this.setPerspective();
    this.updateUniformsLocally();
    this.updateGlobalUniforms();
  }
}
