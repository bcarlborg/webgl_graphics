import DrawableEntity from '../../../DrawableEntity.js';
import GameTime from '../../../GameTime.js';

export default class MountainPlane extends DrawableEntity {
  constructor(gl, geometry, material) {
    super(gl, geometry, material);
    this.gameTime = new GameTime();
    this.virtualUniforms.time = this.gameTime.timeInfo.t;
  }

  update() {
    this.virtualUniforms.time = this.gameTime.timeInfo.t;
    super.update();
  }
}
