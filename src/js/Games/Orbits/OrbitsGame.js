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
    this.initPlanets();
    this.initSkyBox();
  }

  initPlanets() {
    const centerPlanet = this.planetBuilder.buildPlanet(null, 2);
    const orbit1 = this.planetBuilder.buildPlanet(centerPlanet, 1, [4, 0, 0]);
    const orbit2 = this.planetBuilder.buildPlanet(centerPlanet, 1, [-4, 0, 0]);

    this.gameObjects.push(centerPlanet, orbit1, orbit2);
  }

  initSkyBox() {
    const skyBoxMat = new Material(this.gl);
    skyBoxMat.setToSkyBoxMaterial([
      'interstellar_px.jpg',
      'interstellar_nx.jpg',
      'interstellar_py.jpg',
      'interstellar_ny.jpg',
      'interstellar_pz.jpg',
      'interstellar_nz.jpg',
    ]);
    const skyBoxGeometry = primitiveBuilders.buildCube(100);
    const skyBoxMesh = new Mesh(this.gl, skyBoxMat, skyBoxGeometry);
    const skyBox = new SkyBox(this.gl, skyBoxMesh);
    this.gameObjects.push(skyBox);
  }
}
