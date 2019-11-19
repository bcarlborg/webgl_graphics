import glMatrix from './helpers/glm.js';

export default class Camera {
  constructor(canvas) {
    this.canvas = canvas;
    this.cameraMatrix = glMatrix.mat4.create();
    this.projectionMatrix = glMatrix.mat4.create();

    this.position = {
      location: glMatrix.vec3.fromValues(0, 0, -10),
      lookAtPoint: glMatrix.vec3.fromValues(0, 0, 0),
      up: glMatrix.vec3.fromValues(0, 1, 0),
    };

    this.virtualUniforms = {
      u_viewDirectionProjectionInverse: glMatrix.mat4.create(),
      u_projectionMatrix: glMatrix.mat4.create(),
      u_viewMatrix: glMatrix.mat4.create(),
    };
  }

  setPerspective() {
    const fov = glMatrix.glMatrix.toRadian(60);
    const aspect = this.canvas.width / this.canvas.height;
    const near = 0.01;
    const far = 10000;
    glMatrix.mat4.perspective(
      this.projectionMatrix, fov, aspect, near, far,
    );
  }

  setTolookAt() {
    glMatrix.mat4.targetTo(
      this.cameraMatrix,
      this.position.location,
      this.position.lookAtPoint,
      this.position.up,
    );
  }

  updateUniformsFromLocalValues() {
    glMatrix.mat4.copy(
      this.virtualUniforms.u_projectionMatrix,
      this.projectionMatrix,
    );
    glMatrix.mat4.invert(
      this.virtualUniforms.u_viewMatrix,
      this.cameraMatrix,
    );
    this.updateViewDirectionProjection();
  }

  updateViewDirectionProjection() {
    const { u_viewDirectionProjectionInverse } = this.virtualUniforms;
    // get the view direction direction
    glMatrix.mat4.copy(
      u_viewDirectionProjectionInverse,
      this.virtualUniforms.u_viewMatrix,
    );
    // set translation to zero
    u_viewDirectionProjectionInverse[12] = 0;
    u_viewDirectionProjectionInverse[13] = 0;
    u_viewDirectionProjectionInverse[14] = 0;

    // view direction projection
    glMatrix.mat4.multiply(
      u_viewDirectionProjectionInverse,
      this.virtualUniforms.u_projectionMatrix,
      u_viewDirectionProjectionInverse,
    );

    // view direction projection inverse
    glMatrix.mat4.invert(
      u_viewDirectionProjectionInverse,
      u_viewDirectionProjectionInverse,
    );
  }

  update() {
    this.setPerspective();
    this.setTolookAt();
    this.updateUniformsFromLocalValues();
  }
}
