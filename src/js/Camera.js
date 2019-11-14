import ClickListener from './ClickListener.js';
import KeyHandler from './KeyHandler.js';
import glMatrix from './helpers/glm.js';

export default class Camera {
  constructor(canvas) {
    this.canvas = canvas;
    this.clickListener = new ClickListener();
    this.keyHandler = new KeyHandler();
    this.virtualUniforms = {
      viewMatrix: glMatrix.mat4.create(),
      projectionMatrix: glMatrix.mat4.create(),
      viewDirection: glMatrix.quat.create(),
      viewScale: glMatrix.vec3.create(),
      viewDirectionProjectionMatrix: glMatrix.mat4.create(),
    };

    glMatrix.mat4.getRotation(
      this.virtualUniforms.viewDirection,
      this.virtualUniforms.viewMatrix,
    );
    glMatrix.mat4.getScaling(
      this.virtualUniforms.viewScale,
      this.virtualUniforms.viewMatrix,
    );
    glMatrix.mat4.fromRotationTranslationScale(
      this.virtualUniforms.viewDirectionProjectionMatrix,
      this.virtualUniforms.viewDirection,
      [0, 0, 0],
      this.virtualUniforms.viewScale,
    );
    glMatrix.mat4.mul(
      this.virtualUniforms.viewDirectionProjectionMatrix,
      this.virtualUniforms.projectionMatrix,
      this.virtualUniforms.viewDirectionProjectionMatrix,
    );
    glMatrix.mat4.invert(
      this.virtualUniforms.viewDirectionProjectionMatrix,
      this.virtualUniforms.viewDirectionProjectionMatrix,
    );

    this.cameraPositionInfo = {
      cameraPos: glMatrix.vec3.fromValues(10, 0, 10),
      cameraFront: glMatrix.vec3.fromValues(0, 0, -1),
      cameraFrontOld: glMatrix.vec3.create(),
      cameraLookAt: glMatrix.vec3.create(),
      cameraUp: glMatrix.vec3.fromValues(0, 1, 0),
    };

    glMatrix.vec3.normalize(
      this.cameraPositionInfo.cameraFront,
      this.cameraPositionInfo.cameraPos,
    );

    glMatrix.vec3.scale(
      this.cameraPositionInfo.cameraFront,
      this.cameraPositionInfo.cameraFront,
      -1,
    );


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
      this.screenToRayInWorld(clickRayWorld, click.loc);
      glMatrix.vec3.copy(cameraFrontOld, clickRayWorld);
      glMatrix.vec3.copy(cameraFront, clickRayWorld);
    } else if (drag.is) {
      this.clickRayData.lastUpdateWasDrag = true;
      glMatrix.vec2.scale(dragDiffScreenRev, drag.diff, -1);
      this.screenToRayInWorld(dragDiffRay, dragDiffScreenRev);
      glMatrix.vec3.add(cameraFront, dragDiffRay, cameraFrontOld);
    } else if (this.clickRayData.lastUpdateWasDrag) {
      this.screenToRayInWorld(clickRayWorld, dragResetRay);
      glMatrix.vec3.copy(cameraFrontOld, clickRayWorld);
      glMatrix.vec3.copy(cameraFront, clickRayWorld);
      this.clickRayData.lastUpdateWasDrag = false;
    }
  }

  processKeyPress() {
    const normalizeCameraFront = () => {
      glMatrix.vec3.normalize(
        this.cameraPositionInfo.cameraFront,
        this.cameraPositionInfo.cameraFront,
      );
    };
    if (this.keyHandler.keysPressed.W) {
      normalizeCameraFront();
      glMatrix.vec3.scaleAndAdd(
        this.cameraPositionInfo.cameraPos,
        this.cameraPositionInfo.cameraPos,
        this.cameraPositionInfo.cameraFront,
        0.1,
      );
    }
    if (this.keyHandler.keysPressed.S) {
      normalizeCameraFront();
      glMatrix.vec3.scaleAndAdd(
        this.cameraPositionInfo.cameraPos,
        this.cameraPositionInfo.cameraPos,
        this.cameraPositionInfo.cameraFront,
        -0.1,
      );
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

    glMatrix.mat4.getRotation(
      this.virtualUniforms.viewDirection,
      this.virtualUniforms.viewMatrix,
    );
    glMatrix.mat4.getScaling(
      this.virtualUniforms.viewScale,
      this.virtualUniforms.viewMatrix,
    );
    glMatrix.mat4.fromRotationTranslationScale(
      this.virtualUniforms.viewDirectionProjectionMatrix,
      this.virtualUniforms.viewDirection,
      [0, 0, 0],
      this.virtualUniforms.viewScale,
    );
    glMatrix.mat4.mul(
      this.virtualUniforms.viewDirectionProjectionMatrix,
      this.virtualUniforms.projectionMatrix,
      this.virtualUniforms.viewDirectionProjectionMatrix,
    );
    glMatrix.mat4.invert(
      this.virtualUniforms.viewDirectionProjectionMatrix,
      this.virtualUniforms.viewDirectionProjectionMatrix,
    );

    this.processClick();
    this.processKeyPress();

    glMatrix.mat4.lookAt(
      this.virtualUniforms.viewMatrix,
      cameraPos,
      cameraLookAt,
      cameraUp,
    );
  }
}
