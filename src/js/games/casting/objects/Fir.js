import SceneGraphEntity from '../../../SceneGraphEntity.js';
import ClippedQuadric from '../../../ClippedQuadric.js';
import GameTime from '../../../GameTime.js';

export default class Fir extends SceneGraphEntity {
  constructor(index) {
    super();
    this.nextIndex = index;
    this.timeInfo = (new GameTime()).timeInfo;
    this.greenColor = [0.3, 0.9, 0.3];
    this.trunkColor = [0.3, 0.2, 0.1];
    this.moveAlongUp(-1.2);
    this.initBody();
  }

  initBody() {
    const trunk = new ClippedQuadric(this.nextIndex);
    this.nextIndex++;
    trunk.setToUnitCylinder();
    trunk.setParent(this);
    trunk.setColor(...this.trunkColor);
    trunk.scaleVec(0.2, 0.75, 0.2);

    const bodyLower = new ClippedQuadric(this.nextIndex);
    this.nextIndex++;
    bodyLower.setToVerticalCone();
    bodyLower.setParent(this);
    bodyLower.setColor(...this.greenColor);
    bodyLower.scaleVec(0.85, 1.5, 0.85);
    bodyLower.moveAlongUp(3);

    const bodyMid = new ClippedQuadric(this.nextIndex);
    this.nextIndex++;
    bodyMid.setToVerticalCone();
    bodyMid.setParent(this);
    bodyMid.setColor(...this.greenColor);
    bodyMid.scaleVec(0.65, 1.3, 0.65);
    bodyMid.moveAlongUp(4);

    const bodyUpper = new ClippedQuadric(this.nextIndex);
    this.nextIndex++;
    bodyUpper.setToVerticalCone();
    bodyUpper.setParent(this);
    bodyUpper.setColor(...this.greenColor);
    bodyUpper.scaleVec(0.55, 1, 0.55);
    bodyUpper.moveAlongUp(4.4);
  }

  move() {
    const curr = this.timeInfo.t / 500;
    this.setPosition(
      Math.cos(curr) * 10,
      -1.2,
      Math.sin(curr) * 10,
    );
  }

  update() {
    this.move();
    super.update();
  }

  draw() {}
}
