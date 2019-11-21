import PositionableEntity from './PositionableEntity.js';
import GlobalUniforms from './GlobalUniforms.js';
import glMatrix from './helpers/glm.js';

export default class Camera extends PositionableEntity {
  constructor(canvas) {
    super();
    this.canvas = canvas;

    this.cameraUniforms = {
      u_viewDirectionProjectionInverse: glMatrix.mat4.create(),
      u_projectionMatrix: glMatrix.mat4.create(),
      u_viewMatrix: glMatrix.mat4.create(),
      u_cameraPosition: glMatrix.vec3.create(),
    };

    this.globalUniforms = new GlobalUniforms();
    this.globalUniforms.setManyUniforms(this.cameraUniforms);

    this.setPositionInformation({
      location: glMatrix.vec3.fromValues(0, 0, -10),
      forward: glMatrix.vec3.fromValues(0, 0, 1),
      lateral: glMatrix.vec3.fromValues(1, 0, 0),
      up: glMatrix.vec3.fromValues(0, 1, 0),
    });
  }

  setPerspective() {
    const fov = glMatrix.glMatrix.toRadian(45);
    const aspect = this.canvas.width / this.canvas.height;
    const near = 0.01;
    const far = 10000;

    glMatrix.mat4.perspective(
      this.cameraUniforms.u_projectionMatrix, fov, aspect, near, far,
    );
  }

  updateUniformsLocally() {
    const { u_viewDirectionProjectionInverse } = this.cameraUniforms;

    glMatrix.mat4.invert(
      this.cameraUniforms.u_viewMatrix,
      this.positionMatrix,
    );

    glMatrix.vec3.copy(
      this.cameraUniforms.u_cameraPosition,
      this.position.location,
    );

    glMatrix.mat4.copy(
      u_viewDirectionProjectionInverse,
      this.cameraUniforms.u_viewMatrix,
    );
    // set translation to zero so all that is left is direction
    u_viewDirectionProjectionInverse[12] = 0;
    u_viewDirectionProjectionInverse[13] = 0;
    u_viewDirectionProjectionInverse[14] = 0;

    // view direction projection
    glMatrix.mat4.multiply(
      u_viewDirectionProjectionInverse,
      this.cameraUniforms.u_projectionMatrix,
      u_viewDirectionProjectionInverse,
    );

    // view direction projection inverse
    glMatrix.mat4.invert(
      u_viewDirectionProjectionInverse,
      u_viewDirectionProjectionInverse,
    );
  }

  updateGlobalUniforms() {
    this.globalUniforms.setManyUniforms(this.cameraUniforms);
  }

  update() {
    super.update();
    this.setPerspective();
    this.updateUniformsLocally();
    this.updateGlobalUniforms();
  }
}
