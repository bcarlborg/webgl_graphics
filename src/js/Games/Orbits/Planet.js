import GameNode from '../../GameNode.js';
import glMatrix from '../../helpers/glm.js';

export default class Planet extends GameNode {
  constructor(gl, mesh) {
    super(gl, mesh);
    this.rotationDelta = glMatrix.glMatrix.toRadian(45);
    this.identityBase = glMatrix.mat4.create();
  }

  rotate() {
    glMatrix.mat4.rotate(this.localMatrix, this.identityBase, this.rotationDelta, [1, 1, 0]);
    // this.rotationDelta += this.rotationDelta;
  }

  update() {
    this.rotate();
    super.update();
  }
}
