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
      u_projectionMatrix: glMatrix.mat4.create(),
      u_viewMatrix: glMatrix.mat4.create(),
    };
  }

  setPerspective() {
    const fov = glMatrix.glMatrix.toRadian(60);
    const aspect = this.canvas.width / this.canvas.height;
    const near = 0.01;
    const far = 100;
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

  }

  update() {
    this.setPerspective();
    this.setTolookAt();
    this.updateUniformsFromLocalValues();
  }
}
