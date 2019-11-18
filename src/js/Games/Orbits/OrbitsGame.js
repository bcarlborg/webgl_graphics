import PlanetBuilder from './PlanetBuilder.js';

import Game from '../Game.js';

export default class OrbitsGame extends Game {
  constructor(gl) {
    super();
    this.gl = gl;
    this.planetBuilder = new PlanetBuilder(this.gl);
    this.initSpaceship();
    // this.initTestPlanet();
  }

  initSpaceship() {
    const spaceShip = this.planetBuilder.buildSpaceShip();
    this.gameObjects.push(spaceShip);
  }

  initTestPlanet() {
    const testPlanet = this.planetBuilder.buildTestPlanet(null, 2);
    testPlanet.setLocation(0, 3, 0);
    this.gameObjects.push(testPlanet);
  }
}
