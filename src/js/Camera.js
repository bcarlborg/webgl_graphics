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

    this.cameraPositionInfo = {
      cameraPos: glMatrix.vec3.fromValues(0, 0, 10),
      cameraFront: glMatrix.vec3.fromValues(0, 0, -1),
      cameraFrontOld: glMatrix.vec3.create(),
      cameraLookAt: glMatrix.vec3.create(),
      cameraUp: glMatrix.vec3.fromValues(0, 1, 0),
    };

    glMatrix.vec3.copy(
      this.cameraPositionInfo.cameraFrontOld,
      this.cameraPositionInfo.cameraFront,
    );

    this.clickRayData = {
      inverseProjection: glMatrix.mat4.create(),
      inverseView: glMatrix.mat4.create(),
      clickRay: glMatrix.vec4.create(),
      clickRayWorld: glMatrix.vec3.create(),
      dragDiffRay: glMatrix.vec3.create(),
      dragResetRay: glMatrix.vec2.fromValues(0, 0),
      dragDiffScreenRev: glMatrix.vec2.create(),
      lastUpdateWasDrag: false,
    };

    this.initializeCamera();
  }

  screenToRayInWorld(outVec, screenVec) {
    const {
      inverseProjection, inverseView, clickRay,
    } = this.clickRayData;

    // ray clip
    glMatrix.vec4.set(
      clickRay, screenVec[0], screenVec[1], -1.0, 1.0,
    );
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
    glMatrix.mat4.invert(
      inverseView, this.virtualUniforms.viewMatrix,
    );
    glMatrix.vec4.transformMat4(
      clickRay, clickRay, inverseView,
    );
    glMatrix.vec3.set(
      outVec, clickRay[0], clickRay[1], clickRay[2],
    );
    glMatrix.vec3.normalize(outVec, outVec);
  }

  processClick() {
    const { click, drag } = this.clickListener.info;
    const { cameraFront, cameraFrontOld } = this.cameraPositionInfo;
    const {
      clickRayWorld, dragDiffRay, dragDiffScreenRev, dragResetRay,
    } = this.clickRayData;

    if (click.is) {
      console.log('click');
      this.screenToRayInWorld(clickRayWorld, click.loc);
      glMatrix.vec3.copy(cameraFrontOld, clickRayWorld);
      glMatrix.vec3.copy(cameraFront, clickRayWorld);
    } else if (drag.is) {
      this.clickRayData.lastUpdateWasDrag = true;
      glMatrix.vec2.scale(dragDiffScreenRev, drag.diff, -1);
      console.log(dragDiffScreenRev);
      this.screenToRayInWorld(dragDiffRay, dragDiffScreenRev);

      console.log(dragDiffRay);

      glMatrix.vec3.add(cameraFront, dragDiffRay, cameraFrontOld);
    } else if (this.clickRayData.lastUpdateWasDrag) {
      this.screenToRayInWorld(clickRayWorld, dragResetRay);
      glMatrix.vec3.copy(cameraFrontOld, clickRayWorld);
      glMatrix.vec3.copy(cameraFront, clickRayWorld);
      this.clickRayData.lastUpdateWasDrag = false;
    }
  }

  initializeCamera() {
    const { viewMatrix, projectionMatrix } = this.virtualUniforms;
    const {
      cameraPos, cameraFront, cameraUp, cameraLookAt,
    } = this.cameraPositionInfo;

    glMatrix.vec3.add(cameraLookAt, cameraPos, cameraFront);
    glMatrix.mat4.lookAt(
      viewMatrix,
      cameraPos,
      cameraLookAt,
      cameraUp,
    );

    glMatrix.mat4.perspective(
      projectionMatrix,
      glMatrix.glMatrix.toRadian(45),
      this.canvas.width / this.canvas.height,
      0.1, // frustrum near
      1000.0, // frustrum far
    );
  }

  update() {
    const {
      cameraPos, cameraFront, cameraUp, cameraLookAt,
    } = this.cameraPositionInfo;

    glMatrix.mat4.identity(this.virtualUniforms.projectionMatrix);
    glMatrix.mat4.perspective(
      this.virtualUniforms.projectionMatrix,
      glMatrix.glMatrix.toRadian(45),
      this.canvas.width / this.canvas.height,
      0.01, // frustrum near
      1000.0, // frustrum far
    );
    glMatrix.vec3.add(cameraLookAt, cameraPos, cameraFront);

    this.processClick();

    glMatrix.mat4.lookAt(
      this.virtualUniforms.viewMatrix,
      cameraPos,
      cameraLookAt,
      cameraUp,
    );
  }
}
