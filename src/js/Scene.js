import ClickListener from './ClickListener.js';
import Camera from './Camera.js';
import OrbitsGame from './games/orbits/OrbitsGame.js';

export default class Scene {
  constructor(gl, canvas) {
    this.canvas = canvas;
    this.gl = gl;
    this.clickListener = new ClickListener(this.canvas);
    this.camera = new Camera(this.canvas);
    this.game = new OrbitsGame(this.gl);
  }

  update() {
    this.clickListener.update();
    if (this.clickListener.info.click.is) console.log('click!', this.clickListener.info.click);
    if (this.clickListener.info.drag.is) console.log('drag!', this.clickListener.info.drag);
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
