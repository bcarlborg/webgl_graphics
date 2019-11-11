// import * as twgl from '../lib/twgl-full.module.js';
// import glMatrix from './helpers/glm.js';
// import GameEntity from './GameEntity.js';
// import Mesh from './Mesh.js';

import OrbitsGame from './games/orbits/OrbitsGame.js';

export default class Scene {
  constructor(gl, canvas) {
    this.canvas = canvas;
    this.gl = gl;
    this.game = new OrbitsGame(this.gl);
  }

  update() {
    this.game.objectsToUpdate().forEach((object) => {
      object.update();
    });
  }

  draw() {
    this.game.objectsToDraw().forEach((object) => {
      object.draw();
    });
  }
}
