import glMatrix from './helpers/glm.js';

export default class Camera {
  constructor(canvas) {
    this.canvas = canvas;

    this.cameraMatrix = glMatrix.mat4.create();
    this.projectionMatrix = glMatrix.mat4.create();

    this.virtualUniforms = {
      u_projectionMatrix: glMatrix.mat4.create(),
      u_viewMatrix: glMatrix.mat4.create(),
    };

    this.initCamera();
  }

  initCamera() {
    this.setCameraLocation([0, 3, -10]);
    this.lookAt([0, 0, 0]);
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

  lookAt(lookAtPoint) {
    const up = [0, 1, 0];

    const viewerPosition = glMatrix.vec3.create();
    glMatrix.mat4.getTranslation(
      viewerPosition,
      this.cameraMatrix,
    );

    glMatrix.mat4.targetTo(
      this.cameraMatrix, viewerPosition, lookAtPoint, up,
    );
  }

  rotateCamera(degrees, axis) {
    const rads = glMatrix.glMatrix.toRadian(degrees);
    glMatrix.mat4.rotate(
      this.cameraMatrix,
      this.cameraMatrix,
      rads,
      axis,
    );
  }

  translateCamera(vecDiff) {
    glMatrix.mat4.translate(
      this.cameraMatrix,
      this.cameraMatrix,
      vecDiff,
    );
  }

  setCameraLocation(loc) {
    glMatrix.mat4.getTranslation(
      this.cameraMatrix,
      this.cameraMatrix,
      [0, 0, 0],
    );
    glMatrix.mat4.translate(
      this.cameraMatrix,
      this.cameraMatrix,
      loc,
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
  }

  update() {
    this.setPerspective();
    this.updateUniformsFromLocalValues();
  }
}
