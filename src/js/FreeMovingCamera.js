import Camera from './Camera.js';
import KeyHandler from './KeyHandler.js';

export default class FreeMovingCamera extends Camera {
  constructor(canvas) {
    super(canvas);
    this.KeyHandler = new KeyHandler();
  }

  processKeysPressed() {
    if (this.KeyHandler.keysPressed.W) {
      this.moveAlongForward(0.1);
    }
    if (this.KeyHandler.keysPressed.S) {
      this.moveAlongForward(-0.1);
    }
    if (this.KeyHandler.keysPressed.A) {
      this.moveAlongLateral(0.1);
    }
    if (this.KeyHandler.keysPressed.D) {
      this.moveAlongLateral(-0.1);
    }
  }

  update() {
    this.processKeysPressed();
    super.update();
  }
}
