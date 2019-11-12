import Camera from './Camera.js';
import OrbitsGame from './games/orbits/OrbitsGame.js';

export default class Scene {
  constructor(gl, canvas) {
    this.canvas = canvas;
    this.gl = gl;
    this.camera = new Camera(this.canvas);
    this.game = new OrbitsGame(this.gl);
  }

  update() {
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
