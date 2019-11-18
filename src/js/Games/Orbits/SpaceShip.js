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
      forward: glMatrix.vec3.create(),
      lateral: glMatrix.vec3.create(),
      up: glMatrix.vec3.create(),
    };
    this.initSpaceship();
  }

  initSpaceship() {
    glMatrix.vec3.set(this.position.location, 0, 0, -10);
    glMatrix.vec3.set(this.position.forward, 0, 0, 1);
    glMatrix.vec3.set(this.position.up, 0, 1, 0);
    glMatrix.vec3.set(this.position.lateral, 1, 0, 0);
  }

  updateRotation(rotation) {
    glMatrix.quat.multiply(this.position.rotation, this.position.rotation, rotation);
  }

  relativePitch(delta) {
    const rad = glMatrix.glMatrix.toRadian(delta);
    const rotation = glMatrix.quat.create();
    glMatrix.quat.setAxisAngle(
      rotation,
      this.position.lateral,
      rad,
    );
    glMatrix.vec3.transformQuat(
      this.position.forward,
      this.position.forward,
      rotation,
    );
    glMatrix.vec3.transformQuat(
      this.position.up,
      this.position.up,
      rotation,
    );
    this.updateRotation(rotation);
  }

  relativeYaw(delta) {
    const rad = glMatrix.glMatrix.toRadian(delta);
    const rotation = glMatrix.quat.create();
    glMatrix.quat.setAxisAngle(
      rotation,
      this.position.up,
      rad,
    );
    glMatrix.vec3.transformQuat(
      this.position.lateral,
      this.position.lateral,
      rotation,
    );
    glMatrix.vec3.transformQuat(
      this.position.forward,
      this.position.forward,
      rotation,
    );
    this.updateRotation(rotation);
  }

  relativeRoll(delta) {
    const rad = glMatrix.glMatrix.toRadian(delta);
    const rotation = glMatrix.quat.create();
    glMatrix.quat.setAxisAngle(
      rotation,
      this.position.forward,
      rad,
    );
    glMatrix.vec3.transformQuat(
      this.position.lateral,
      this.position.lateral,
      rotation,
    );
    glMatrix.vec3.transformQuat(
      this.position.up,
      this.position.up,
      rotation,
    );
    this.updateRotation(rotation);
  }

  update() {
    const degreeDelta = (this.gameTime.timeInfo.dt / 1000) * 45;
    this.relativePitch(degreeDelta);
    this.relativeYaw(degreeDelta);

    glMatrix.mat4.fromRotationTranslation(
      this.localMatrix,
      this.position.rotation,
      [0, 0, 0],
    );
    super.update();
  }
}
