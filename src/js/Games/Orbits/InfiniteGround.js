import GameEntity from '../../GameEntity.js';
import glMatrix from '../../helpers/glm.js';

export default class InfiniteGround extends GameEntity {
  constructor(gl, mesh) {
    super(gl, mesh);
    this.virtualUniforms.worldMatrix = glMatrix.mat4.create();
    this.setWorldMatrix();
  }

  setWorldMatrix() {
    glMatrix.mat4.fromTranslation(
      this.virtualUniforms.worldMatrix,
      [0, 0, 0],
    );
  }
}
