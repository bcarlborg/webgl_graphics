import PlanetBuilder from './PlanetBuilder.js';

import Game from '../Game.js';

export default class OrbitsGame extends Game {
  constructor(gl) {
    super();
    this.gl = gl;
    this.planetBuilder = new PlanetBuilder(this.gl);
    this.cameraFollowObject = null;
    this.initSpaceship();
    // this.initTestPlanet();
    this.initSkyBox();
  }

  initSpaceship() {
    const spaceShip = this.planetBuilder.buildSpaceShip();
    this.cameraFollowObject = spaceShip;
    this.gameObjects.push(spaceShip);
  }

  initTestPlanet() {
    const testPlanet = this.planetBuilder.buildTestPlanet(null, 2);
    testPlanet.setLocation(0, 3, 10);
    this.gameObjects.push(testPlanet);
  }

  initSkyBox() {
    const skybox = this.planetBuilder.buildSkyBox();
    console.log(skybox);
    this.gameObjects.push(skybox);
  }
}
