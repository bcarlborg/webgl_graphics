import ClippedQuadric from '../../../ClippedQuadric.js';
import GameTime from '../../../GameTime.js';

export default class Wauble extends ClippedQuadric {
  constructor(index) {
    super(index);
    this.setToSphere();
    this.timeInfo = (new GameTime()).timeInfo;
    this.uniforms.refractive = 1.0;
    this.uniforms.mu = 0.5;
  }

  hop() {
    const upOrDown = Math.sin(this.timeInfo.t / 500);
    let vertDelta = this.timeInfo.dt / 500;
    if (upOrDown < 0) vertDelta = -1 * this.timeInfo.dt / 500;
    this.moveAlongUp(vertDelta);
  }

  update() {
    // this.hop();
    super.update();
  }
}
