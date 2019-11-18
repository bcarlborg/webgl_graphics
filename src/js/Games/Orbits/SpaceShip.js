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
      location: glMatrix.vec3.create(),
      rotation: glMatrix.quat.create(),
      initialForward: glMatrix.vec3.fromValues(0, 0, 1),
      forward: glMatrix.vec3.create(),
      initialLateral: glMatrix.vec3.fromValues(1, 0, 0),
      lateral: glMatrix.vec3.create(),
      initialUp: glMatrix.vec3.fromValues(0, 1, 0),
      up: glMatrix.vec3.create(),
    };
    this.initSpaceship();
  }

  initSpaceship() {
    glMatrix.vec3.set(this.position.location, 0, 0, -10);
    glMatrix.vec3.set(this.position.forward, 0, 0, 1);
    glMatrix.vec3.set(this.position.lateral, 1, 0, 0);
    glMatrix.vec3.set(this.position.up, 0, 1, 0);
  }

  updateRotation(rotation) {
    glMatrix.quat.multiply(this.position.rotation, rotation, this.position.rotation);
  }

  relativePitch(delta) {
    const rad = glMatrix.glMatrix.toRadian(delta);
    const rotation = glMatrix.quat.create();
    glMatrix.quat.setAxisAngle(
      rotation,
      this.position.lateral,
      rad,
    );
    this.updateRotation(rotation);
    glMatrix.vec3.transformQuat(
      this.position.forward,
      this.position.initialForward,
      this.position.rotation,
    );
    glMatrix.vec3.transformQuat(
      this.position.up,
      this.position.initialUp,
      this.position.rotation,
    );
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
    glMatrix.vec3.transformQuat(
      this.position.forward,
      this.position.initialForward,
      this.position.rotation,
    );
    glMatrix.vec3.transformQuat(
      this.position.lateral,
      this.position.initialLateral,
      this.position.rotation,
    );
  }

  relativeRoll(delta) {
    const rad = glMatrix.glMatrix.toRadian(delta);
    const rotation = glMatrix.quat.create();
    glMatrix.quat.setAxisAngle(
      rotation,
      this.position.forward,
      rad,
    );
    this.updateRotation(rotation);
    glMatrix.vec3.transformQuat(
      this.position.up,
      this.position.initialUp,
      this.position.rotation,
    );
    glMatrix.vec3.transformQuat(
      this.position.lateral,
      this.position.initialLateral,
      this.position.rotation,
    );
  }

  processKeysPressed() {
    const degreeDelta = (this.gameTime.timeInfo.dt / 1000) * 45;
    if (this.KeyHandler.keysPressed.UP) this.relativePitch(degreeDelta);
    if (this.KeyHandler.keysPressed.LEFT) this.relativeRoll(degreeDelta);
    if (this.KeyHandler.keysPressed.RIGHT) this.relativeRoll(-degreeDelta);
    if (this.KeyHandler.keysPressed.DOWN) this.relativePitch(-degreeDelta);
  }

  update() {
    this.processKeysPressed();
    console.log(this.position.forward);
    glMatrix.mat4.fromRotationTranslation(
      this.localMatrix,
      this.position.rotation,
      [0, 0, 0],
    );
    super.update();
  }
}
