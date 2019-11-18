import Camera from './Camera.js';

export default class FirstPersonCamera extends Camera {
  constructor(canvas, gameNode) {
    super(canvas);
    this.gameNode = gameNode;
  }

  update() {
    // camera should exactly follow the object
    super.update();
  }
}
