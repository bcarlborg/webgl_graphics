import Planet from './Planet.js';
import ProgramBuilder from '../../ProgramBuilder.js';
import primitiveBuilders from '../../primitiveBuilders.js';
import Mesh from '../../Mesh.js';

import Game from '../Game.js';

export default class OrbitsGame extends Game {
  constructor(gl) {
    super();
    this.gl = gl;
    this.initObjects();
  }

  initObjects() {
    const progBuilder = new ProgramBuilder(this.gl);
    const programInfo = progBuilder.buildProgram('base-vs.glsl', 'base-fs.glsl');
    const cubeGeometry = primitiveBuilders.buildColoredCube(0.5, [0.1, 0.7, 0.7]);
    const mesh = new Mesh(this.gl, programInfo, cubeGeometry);

    const planet = new Planet(this.gl, mesh);
    this.gameObjects.push(planet);
  }
}
