import ClickListener from './ClickListener.js';
import glMatrix from './helpers/glm.js';

export default class Camera {
  constructor(canvas) {
    this.canvas = canvas;
    this.clickListener = new ClickListener();
    this.virtualUniforms = {
      viewMatrix: glMatrix.mat4.create(),
      projectionMatrix: glMatrix.mat4.create(),
    };

    this.clickRayData = {
      inverseProjection: glMatrix.mat4.create(),
      inverseView: glMatrix.mat4.create(),
      clickRay: glMatrix.vec4.create(),
      clickRayWorld: glMatrix.vec3.create(),
    };
  }

  processClick() {
    const { click } = this.clickListener.info;
    if (click.is) {
      const {
        inverseProjection, inverseView, clickRay, clickRayWorld,
      } = this.clickRayData;
      console.log('click', click.loc);
      // ray clip
      glMatrix.vec4.set(
        clickRay, click.loc[0], click.loc[1], -1.0, 1.0,
      );
      console.log('rayClip', clickRay);

      glMatrix.mat4.invert(
        inverseProjection, this.virtualUniforms.projectionMatrix,
      );

      // ray eye rayEye = inverse(projmatrix) * clickRay
      glMatrix.vec4.transformMat4(
        clickRay, clickRay, inverseProjection,
      );

      glMatrix.vec4.set(
        clickRay, clickRay[0], clickRay[1], -1.0, 0.0,
      );
      console.log('rayEye', clickRay);

      glMatrix.mat4.invert(
        inverseView, this.virtualUniforms.viewMatrix,
      );

      glMatrix.vec4.transformMat4(
        clickRay, clickRay, inverseView,
      );

      glMatrix.vec3.set(
        clickRayWorld, clickRay[0], clickRay[1], clickRay[2],
      );

      glMatrix.vec3.normalize(clickRayWorld, clickRayWorld);
      console.log('clickRayWorld', clickRayWorld);
    }
  }

  update() {
    this.processClick();
    const { viewMatrix, projectionMatrix } = this.virtualUniforms;
    glMatrix.mat4.lookAt(
      viewMatrix,
      [0, 0, 10], // location of camera
      [0, 0, 0], // point looking at
      [1, 0, 0], // up for camera
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
