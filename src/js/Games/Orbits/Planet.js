import GameNode from '../../GameNode.js';
import glMatrix from '../../helpers/glm.js';

export default class Planet extends GameNode {
  constructor(gl, mesh) {
    super(gl, mesh);
    this.rotationDelta = glMatrix.glMatrix.toRadian(1);
    this.rotation = 0;
    this.identityBase = glMatrix.mat4.create();
    this.rotationStart = [3, 0, 0];
    this.rotationAxis = [0, 1, 0];
  }

  rotate() {
    glMatrix.mat4.rotate(
      this.localMatrix, this.identityBase, this.rotation, this.rotationAxis,
    );
    this.rotation += this.rotationDelta;
  }

  setRotationAxis(axis) {
    this.rotationAxis = axis;
  }

  setRotationStart(startLoc) {
    this.rotationStart = startLoc;
  }

  orbit() {
    if (this.parent) {
      const parentTrans = glMatrix.vec3.create();
      glMatrix.mat4.getTranslation(parentTrans, this.parent.worldMatrix);
      glMatrix.mat4.fromTranslation(this.localMatrix, parentTrans);
      glMatrix.mat4.fromTranslation(this.localMatrix, this.rotationStart);
    }
  }

  update() {
    this.rotate();
    this.orbit();
    super.update();
  }
}
