import glMatrix from '../../helpers/glm.js';
import KeyHandler from '../../KeyHandler.js';
import GameNode from '../../GameNode.js';
import GameTime from '../../GameTime.js';

export default class SpaceShip extends GameNode {
  constructor(gl, mesh) {
    super(gl, mesh);
    this.KeyHandler = new KeyHandler();
    this.gameTime = new GameTime();
    this.position = {
      rotation: glMatrix.quat.create(),
      location: glMatrix.vec3.create(),
      forward: glMatrix.vec3.create(),
      lateral: glMatrix.vec3.create(),
      up: glMatrix.vec3.create(),
    };
    this.initSpaceship();
  }

  initSpaceship() {
    this.position.initialLocation = glMatrix.vec3.fromValues(0, 0, 0);
    this.position.initialForward = glMatrix.vec3.fromValues(0, 0, 1);
    this.position.initialLateral = glMatrix.vec3.fromValues(1, 0, 0);
    this.position.initialUp = glMatrix.vec3.fromValues(0, 1, 0);

    glMatrix.vec3.copy(
      this.position.location, this.position.initialLocation,
    );
    glMatrix.vec3.copy(
      this.position.forward, this.position.initialForward,
    );
    glMatrix.vec3.copy(
      this.position.up, this.position.initialUp,
    );
    glMatrix.vec3.copy(
      this.position.lateral, this.position.initialLateral,
    );
  }

  updateRotation(rotation) {
    glMatrix.quat.multiply(this.position.rotation, rotation, this.position.rotation);
  }

  updateForward() {
    glMatrix.vec3.transformQuat(
      this.position.forward,
      this.position.initialForward,
      this.position.rotation,
    );
    glMatrix.vec3.normalize(
      this.position.forward, this.position.forward,
    );
  }

  updateLateral() {
    glMatrix.vec3.transformQuat(
      this.position.lateral,
      this.position.initialLateral,
      this.position.rotation,
    );
    glMatrix.vec3.normalize(
      this.position.up, this.position.up,
    );
  }

  updateUp() {
    glMatrix.vec3.transformQuat(
      this.position.up,
      this.position.initialUp,
      this.position.rotation,
    );
    glMatrix.vec3.normalize(
      this.position.up, this.position.up,
    );
  }

  relativePitch(delta) {
    const rad = glMatrix.glMatrix.toRadian(-delta);
    const rotation = glMatrix.quat.create();
    glMatrix.quat.setAxisAngle(
      rotation,
      this.position.lateral,
      rad,
    );
    this.updateRotation(rotation);
    this.updateForward();
    this.updateUp();
  }

  relativeYaw(delta) {
    const rad = glMatrix.glMatrix.toRadian(delta);
    const rotation = glMatrix.quat.create();
    glMatrix.quat.setAxisAngle(
      rotation,
      this.position.up,
      rad,
    );
    this.updateRotation(rotation);
    this.updateForward();
    this.updateLateral();
  }

  relativeRoll(delta) {
    const rad = glMatrix.glMatrix.toRadian(-delta);
    const rotation = glMatrix.quat.create();
    glMatrix.quat.setAxisAngle(
      rotation,
      this.position.forward,
      rad,
    );
    this.updateRotation(rotation);
    this.updateUp();
    this.updateLateral();
  }

  moveForward(delta) {
    glMatrix.vec3.scaleAndAdd(
      this.position.location,
      this.position.location,
      this.position.forward,
      delta,
    );
  }

  processKeysPressed() {
    const degreeDelta = (this.gameTime.timeInfo.dt / 1000) * 45;
    if (this.KeyHandler.keysPressed.UP) this.relativePitch(degreeDelta);
    if (this.KeyHandler.keysPressed.LEFT) this.relativeRoll(degreeDelta);
    if (this.KeyHandler.keysPressed.RIGHT) this.relativeRoll(-degreeDelta);
    if (this.KeyHandler.keysPressed.DOWN) this.relativePitch(-degreeDelta);
    if (this.KeyHandler.keysPressed.SPACE) this.moveForward(0.1);
  }

  update() {
    this.processKeysPressed();
    glMatrix.mat4.fromRotationTranslation(
      this.localMatrix,
      this.position.rotation,
      this.position.location,
    );
    super.update();
  }
}
