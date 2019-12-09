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
    this.movementMagnitude = 0;
  }

  processKeysPressed() {
    // movement
    if (this.KeyHandler.keysPressed.W) {
      this.moveAlongForward(0.3);
    }
    if (this.KeyHandler.keysPressed.S) {
      this.moveAlongForward(-0.3);
    }
    if (this.KeyHandler.keysPressed.A) {
      this.moveAlongLateral(-0.3);
    }
    if (this.KeyHandler.keysPressed.D) {
      this.moveAlongLateral(0.3);
    }

    // rotations
    if (this.KeyHandler.keysPressed.UP) {
      this.relativePitch(1);
    }
    if (this.KeyHandler.keysPressed.DOWN) {
      this.relativePitch(-1);
    }
    if (this.KeyHandler.keysPressed.LEFT) {
      this.relativeYaw(1);
    }
    if (this.KeyHandler.keysPressed.RIGHT) {
      this.relativeYaw(-1);
    }
  }

  update() {
    this.processKeysPressed();
    this.globalUniforms.setUniform('cameraPosition', this.position.location);
    super.update();
  }
}
