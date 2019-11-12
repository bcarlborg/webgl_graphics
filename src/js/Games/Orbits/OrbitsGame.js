import Planet from './Planet.js';
import Material from '../../Material.js';
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
    const cubeMat = new Material(this.gl);
    cubeMat.setToTexturedMaterial('computerTex.jpg');
    const cubeGeometry1 = primitiveBuilders.buildCube(0.5);
    const mesh1 = new Mesh(this.gl, cubeMat, cubeGeometry1);

    const planet = new Planet(this.gl, mesh1);
    this.gameObjects.push(planet);

    // const cubeGeometry2 = primitiveBuilders.buildColoredCube(0.5, [0.1, 0.3, 0.7]);
    // const mesh2 = new Mesh(this.gl, programInfo, cubeGeometry2);
    // const orbiting = new Planet(this.gl, mesh2);
    // orbiting.setParent(planet);
  }
}
