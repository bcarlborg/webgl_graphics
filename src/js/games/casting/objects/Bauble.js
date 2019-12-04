import ClippedQuadric from '../../../ClippedQuadric.js';
import GameTime from '../../../GameTime.js';

export default class Bauble extends ClippedQuadric {
  constructor(index) {
    super(index);
    this.setToSphere();
    this.timeInfo = (new GameTime()).timeInfo;
    this.uniforms.reflective = 1.0;
  }

  hop() {
    const upOrDown = Math.sin(this.timeInfo.t / 500);
    let vertDelta = this.timeInfo.dt / 500;
    if (upOrDown < 0) vertDelta = -1 * this.timeInfo.dt / 500;
    this.moveAlongUp(vertDelta);
  }

  move() {
    const curr = this.timeInfo.t / 500;
    this.moveAlongLateral(Math.sin(curr * 0.10) * -0.09);
    this.moveAlongForward(Math.cos(curr * 0.10) * -0.09);
  }

  update() {
    this.move();
    super.update();
  }
}
