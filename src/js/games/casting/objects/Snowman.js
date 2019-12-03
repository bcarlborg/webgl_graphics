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
    this.moveAlongLateral(-4);
    this.initBody();
  }

  initBody() {
    const bodyLower = new ClippedQuadric(this.nextIndex);
    this.nextIndex++;
    bodyLower.setToSphere();
    bodyLower.setParent(this);
    bodyLower.setColor(...this.snowColor);

    const sphereWithHole = new ClippedQuadric(this.nextIndex);
    this.nextIndex++;
    sphereWithHole.setParent(this);
    sphereWithHole.setToSphereWithHole();
    sphereWithHole.scale(0.8);
    sphereWithHole.moveAlongUp(3);
    sphereWithHole.setColor(...this.snowColor);

    const sphereWithHoleFilling = new ClippedQuadric(this.nextIndex);
    this.nextIndex++;
    sphereWithHoleFilling.setParent(this);
    sphereWithHoleFilling.setToHoleFilling();
    sphereWithHoleFilling.scale(0.8);
    sphereWithHoleFilling.moveAlongUp(3);
    sphereWithHoleFilling.setColor(...this.snowColor);

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
    nose.setParent(this);
    nose.moveAlongUp(8);
    nose.scaleVec(0.1, 0.1, 0.5);
    nose.moveAlongForward(-2);
    nose.moveAlongUp(-2.5);
    nose.setColor(...this.noseColor);

    const coalEye1 = new ClippedQuadric(this.nextIndex);
    this.nextIndex++;
    coalEye1.setToSphere();
    coalEye1.setParent(this);
    coalEye1.scale(0.15);
    coalEye1.moveAlongUp(8);
    coalEye1.moveAlongForward(-1);
    coalEye1.moveAlongLateral(0.4);
    coalEye1.moveAlongUp(-2);

    const coalEye2 = new ClippedQuadric(this.nextIndex);
    this.nextIndex++;
    coalEye2.setToSphere();
    coalEye2.setParent(this);
    coalEye2.scale(0.15);
    coalEye2.moveAlongUp(8);
    coalEye2.moveAlongForward(-1);
    coalEye2.moveAlongLateral(-0.4);
    coalEye2.moveAlongUp(-2);
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
