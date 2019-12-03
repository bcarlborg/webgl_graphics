import SceneGraphEntity from '../../../SceneGraphEntity.js';
import ClippedQuadric from '../../../ClippedQuadric.js';
import GameTime from '../../../GameTime.js';

export default class Snowman extends SceneGraphEntity {
  constructor(index) {
    super();
    this.nextIndex = index;
    this.timeInfo = (new GameTime()).timeInfo;
    this.snowColor = [1.0, 1.0, 1.0];
    this.noseColor = [1.0, 0.5, 0.2];
    this.moveAlongUp(-1);
    this.scale(0.5);
    this.initBody();
  }

  initBody() {
    const bodyLower = new ClippedQuadric(this.nextIndex);
    this.nextIndex++;
    bodyLower.setToSphere();
    bodyLower.setParent(this);
    bodyLower.setColor(...this.snowColor);

    const bodyMid = new ClippedQuadric(this.nextIndex);
    this.nextIndex++;
    bodyMid.setToSphere();
    bodyMid.scale(0.8);
    bodyMid.moveAlongUp(3);
    bodyMid.setParent(this);
    bodyMid.setColor(...this.snowColor);

    const bodyUpper = new ClippedQuadric(this.nextIndex);
    this.nextIndex++;
    bodyUpper.setToSphere();
    bodyUpper.scale(0.64);
    bodyUpper.moveAlongUp(5.5);
    bodyUpper.setParent(this);
    bodyUpper.setColor(...this.snowColor);

    const nose = new ClippedQuadric(this.nextIndex);
    this.nextIndex++;
    nose.setToHorizontalCone();
    nose.scale(0.64);
    nose.moveAlongUp(8);
    nose.setParent(this);
    nose.setColor(...this.snowColor);
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

  draw() {}
}
