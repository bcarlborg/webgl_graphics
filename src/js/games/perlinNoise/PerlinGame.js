import Game from '../Game.js';

export default class PerlinGame extends Game {
  constructor(gl, camera) {
    super();
    this.gl = gl;
    this.camera = camera;
  }
}
