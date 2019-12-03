import ClippedQuadric from '../../../ClippedQuadric.js';
import GameTime from '../../../GameTime.js';

export default class Snowman extends ClippedQuadric {
  constructor(index) {
    super(index);
    this.setToSphere();
    this.timeInfo = (new GameTime()).timeInfo;
    // this.moveAlongUp(10);
  }

  hop() {
    const upOrDown = Math.sin(this.timeInfo.t / 500);
    let vertDelta = this.timeInfo.dt / 500;
    if (upOrDown < 0) vertDelta = -1 * this.timeInfo.dt / 500;
    this.moveAlongUp(vertDelta);
  }

  update() {
    this.hop();
    super.update();
  }
}
