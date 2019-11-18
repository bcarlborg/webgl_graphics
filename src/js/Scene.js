import ClickListener from './ClickListener.js';
import ThirdPersonCamera from './ThirdPersonCamera.js';
import OrbitsGame from './games/orbits/OrbitsGame.js';
import GameTime from './GameTime.js';

export default class Scene {
  constructor(gl, canvas) {
    this.canvas = canvas;
    this.gl = gl;
    this.clickListener = new ClickListener(this.canvas);
    this.GameTime = new GameTime();
    this.camera = new ThirdPersonCamera(this.canvas);
    this.game = new OrbitsGame(this.gl);
    this.cameraFollowObject = this.game.cameraFollowObject;
    this.camera.setObjectToFollow(this.cameraFollowObject);
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
