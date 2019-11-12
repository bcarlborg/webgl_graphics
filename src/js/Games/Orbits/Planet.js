import GameNode from '../../GameNode.js';
import glMatrix from '../../helpers/glm.js';

export default class Planet extends GameNode {
  constructor(gl, mesh) {
    super(gl, mesh);
    this.rotationDelta = glMatrix.glMatrix.toRadian(1);
    this.rotation = 0;
    this.identityBase = glMatrix.mat4.create();
  }

  rotate() {
    glMatrix.mat4.rotate(this.localMatrix, this.identityBase, this.rotation, [1, 0, 0]);
    glMatrix.mat4.rotate(this.localMatrix, this.localMatrix, this.rotation, [0, 1, 0]);
    this.rotation += this.rotationDelta;
  }

  update() {
    this.rotate();
    super.update();
  }
}
