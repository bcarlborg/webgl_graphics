import KeyHandler from './KeyHandler.js';
import Camera from './Camera.js';
// import glMatrix from './helpers/glm.js';

export default class StationaryCamera extends Camera {
  constructor(canvas) {
    super(canvas);
    this.KeyHandler = new KeyHandler();
    // pass in forward and the magnitude
    // steps
    // pass magnitude
    this.directionMagnitude = 0;
  }

  processKeysPressed() {
    if (this.KeyHandler.keysPressed.W) {
      // move forward
    }
    if (this.KeyHandler.keysPressed.S) {
      // move backward
    }
    if (this.KeyHandler.keysPressed.A) {
      // move backward
    }
    if (this.KeyHandler.keysPressed.D) {
      // move backward
    }

    // rotations
    if (this.KeyHandler.keysPressed.LEFT) {
      this.relativeYaw(1);
    }
    if (this.KeyHandler.keysPressed.RIGHT) {
      this.relativeYaw(-1);
    }
  }

  update() {
    this.processKeysPressed();
    super.update();
  }
}
