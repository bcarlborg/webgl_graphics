import PlanetBuilder from './PlanetBuilder.js';
import Material from '../../Material.js';
import SkyBox from '../../SkyBox.js';
import primitiveBuilders from '../../primitiveBuilders.js';
import Mesh from '../../Mesh.js';

import Game from '../Game.js';

export default class OrbitsGame extends Game {
  constructor(gl) {
    super();
    this.gl = gl;
    this.planetBuilder = new PlanetBuilder(this.gl);
    this.initTestPlanet();
    // this.initPlanets();
  }

  initTestPlanet() {
    const testPlanet = this.planetBuilder.buildTestPlanet(null, 2);
    testPlanet.setLocation(0, 3, 0);
    this.gameObjects.push(testPlanet);
  }
}
