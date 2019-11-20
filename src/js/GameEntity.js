import glMatrix from './helpers/glm.js';

export default class GameEntity {
  constructor(parent) {
    this.parent = parent;
    this.children = [];
    this.localMatrix = glMatrix.mat4.create();

    this.virtualUniforms = {
      u_worldMatrix: glMatrix.mat4.create(),
    };

    this.position = {
      rotation: glMatrix.quat.create(),
      location: glMatrix.vec3.create(),
      forward: glMatrix.vec3.create(),
      lateral: glMatrix.vec3.create(),
      up: glMatrix.vec3.create(),
    };

    // easly could set these to be passed in at the constructor
    this.initialPositions = {
      location: glMatrix.vec3.fromValues(0, 0, 0),
      forward: glMatrix.vec3.fromValues(0, 0, 1),
      lateral: glMatrix.vec3.fromValues(1, 0, 0),
      up: glMatrix.vec3.fromValues(0, 1, 0),
    };

    // used to avoid creating a new intermediate variable
    // on every frame with an update change
    this.intermediates = {
      rotation: glMatrix.quat.create(),
    };

    this.initPositions(this.initialPositions);
  }

  initPosition(positions) {
    const { position } = this;
    glMatrix.vec3.copy(
      position.location, positions.location,
    );
    glMatrix.vec3.copy(
      position.forward, positions.forward,
    );
    glMatrix.vec3.copy(
      position.up, positions.up,
    );
    glMatrix.vec3.copy(
      position.lateral, positions.lateral,
    );
  }

  // SCENE GRAPH METHODS
  // externally should use these by calling set parent
  // and remove parent as opposed to add child and removeChild
  setParent(parent) {
    this.parent = parent;
    this.parent.addChild(this);
  }

  addChild(child) {
    this.children.push(child);
  }

  removeChild(child) {
    this.chilren = this.children.filter((item) => item !== child);
  }

  removeParent() {
    this.parent.removeChild(this);
    this.parent = null;
  }

  // POSITION CHANGES
  setPosition(x, y, z) {
    glMatrix.vec3.set(this.position.location, x, y, z);
  }

  moveAlongForward(delta) {
    glMatrix.vec3.scaleAndAdd(
      this.position.location,
      this.position.location,
      this.position.forward,
      delta,
    );
  }

  moveAlongLateral(delta) {
    glMatrix.vec3.scaleAndAdd(
      this.position.location,
      this.position.location,
      this.position.lateral,
      delta,
    );
  }

  moveAlongUp(delta) {
    glMatrix.vec3.scaleAndAdd(
      this.position.location,
      this.position.location,
      this.position.up,
      delta,
    );
  }

  moveAlongXAxis(delta) {
    glMatrix.vec3.scaleAndAdd(
      this.position.location,
      this.position.location,
      [1, 0, 0],
      delta,
    );
  }


  moveAlongYAxis(delta) {
    glMatrix.vec3.scaleAndAdd(
      this.position.location,
      this.position.location,
      [0, 1, 0],
      delta,
    );
  }

  moveAlongZAxis(delta) {
    glMatrix.vec3.scaleAndAdd(
      this.position.location,
      this.position.location,
      [0, 0, 1],
      delta,
    );
  }

  // ROTATION CHANGES
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
    glMatrix.quat.setAxisAngle(
      this.intermediates.rotation,
      this.position.lateral,
      rad,
    );

    this.updateRotation(this.intermediates.rotation);
    this.updateForward();
    this.updateUp();
  }

  relativeYaw(delta) {
    const rad = glMatrix.glMatrix.toRadian(delta);
    glMatrix.quat.setAxisAngle(
      this.intermediates.rotation,
      this.position.up,
      rad,
    );
    this.updateRotation(this.intermediates.rotation);
    this.updateForward();
    this.updateLateral();
  }

  relativeRoll(delta) {
    const rad = glMatrix.glMatrix.toRadian(-delta);
    glMatrix.quat.setAxisAngle(
      this.intermediates.rotation,
      this.position.forward,
      rad,
    );
    this.updateRotation(this.intermediates.rotation);
    this.updateUp();
    this.updateLateral();
  }

  update() {
    this.mesh.update();
  }

  draw(camera) {
    if (camera) {
      Object.assign(this.virtualUniforms, camera.virtualUniforms);
    }
    this.mesh.draw(this.virtualUniforms);
  }
}
