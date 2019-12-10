import KeyHandler from './KeyHandler.js';
import Camera from './Camera.js';
import glMatrix from './helpers/glm.js';

export default class StationaryCamera extends Camera {
  constructor(canvas) {
    super(canvas);
    this.KeyHandler = new KeyHandler();
    // pass in forward and the magnitude
    // steps
    // pass magnitude
    this.movementMagnitude = 0;

    this.angleDown = -17;
    this.relativePitch(this.angleDown);
  }

  resetY(previousY) {
    glMatrix.vec3.set(
      this.position.location,
      this.position.location[0],
      previousY,
      this.position.location[2],
    );
  }

  processKeysPressed() {
    // movement
    const movementSpeed = 0.15;
    const previousY = this.position.location[1];
    if (this.KeyHandler.keysPressed.W) {
      this.moveAlongForward(movementSpeed);
      this.resetY(previousY);
    }
    if (this.KeyHandler.keysPressed.S) {
      this.moveAlongForward(-1 * movementSpeed);
      this.resetY(previousY);
    }
    if (this.KeyHandler.keysPressed.A) {
      this.moveAlongLateral(-movementSpeed);
      this.resetY(previousY);
    }
    if (this.KeyHandler.keysPressed.D) {
      this.moveAlongLateral(movementSpeed);
      this.resetY(previousY);
    }

    // rotations
    if (this.KeyHandler.keysPressed.UP) {
      // this.moveAlongYAxis(movementSpeed);
    }
    if (this.KeyHandler.keysPressed.DOWN) {
      // this.moveAlongYAxis(-movementSpeed);
    }
    if (this.KeyHandler.keysPressed.LEFT) {
      this.relativePitch(-this.angleDown);
      this.relativeYaw(1);
      this.relativePitch(this.angleDown);
    }
    if (this.KeyHandler.keysPressed.RIGHT) {
      this.relativePitch(-this.angleDown);
      this.relativeYaw(-1);
      this.relativePitch(this.angleDown);
    }
  }

  update() {
    this.processKeysPressed();
    this.globalUniforms.setUniform('cameraPosition', this.position.location);
    super.update();
  }
}
