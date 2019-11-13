import glMatrix from './helpers/glm.js';

export default class Camera {
  constructor(canvas) {
    this.canvas = canvas;
    this.virtualUniforms = {
      viewMatrix: glMatrix.mat4.create(),
      projectionMatrix: glMatrix.mat4.create(),
    };
  }

  update() {
    const { viewMatrix, projectionMatrix } = this.virtualUniforms;
    glMatrix.mat4.lookAt(
      viewMatrix,
      [-7, 7, 0], // location of camera
      [0, 0], // point looking at
      [0, 1, 0], // up for camera
    );
    glMatrix.mat4.perspective(
      projectionMatrix,
      glMatrix.glMatrix.toRadian(45),
      this.canvas.width / this.canvas.height,
      0.1, // frustrum near
      1000.0, // frustrum far
    );
  }
}
