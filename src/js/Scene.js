import ClickListener from './ClickListener.js';
import FreeCreateGame from './games/freeCreate/FreeCreateGame.js';
import GameTime from './GameTime.js';
import FreeMovingCamera from './FreeMovingCamera.js';

export default class Scene {
  constructor(gl, canvas) {
    this.canvas = canvas;
    this.gl = gl;
    this.clickListener = new ClickListener(this.canvas);
    this.GameTime = new GameTime();
    this.camera = new FreeMovingCamera(this.canvas);
    // this.camera.setPosition(0, 0, -10);
    this.game = new FreeCreateGame(this.gl, this.camera);
  }

  update() {
    this.GameTime.update();
    this.clickListener.update();
    this.camera.update();
    this.game.objectsToUpdate().forEach((object) => {
      object.update();
    });
  }

  draw() {
    this.game.objectsToDraw().forEach((object) => {
      object.draw(this.camera);
    });
  }
}
