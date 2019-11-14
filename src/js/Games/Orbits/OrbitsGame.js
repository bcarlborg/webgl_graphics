import Planet from './Planet.js';
import Material from '../../Material.js';
import SkyBox from '../../SkyBox.js';
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
    console.log(skyBoxGeometry);
    const skyBoxMesh = new Mesh(this.gl, skyBoxMat, skyBoxGeometry);
    const skyBox = new SkyBox(this.gl, skyBoxMesh);
    this.gameObjects.push(skyBox);

    const cubeMat1 = new Material(this.gl);
    cubeMat1.setToTexturedMaterial('computerTex.jpg');
    const cubeGeometry1 = primitiveBuilders.buildCube(0.5);
    const mesh1 = new Mesh(this.gl, cubeMat1, cubeGeometry1);

    const planet = new Planet(this.gl, mesh1);
    this.gameObjects.push(planet);

    const cubeMat2 = new Material(this.gl);
    cubeMat2.setToBasicMaterial();
    const cubeGeometry2 = primitiveBuilders.buildColoredCube(0.5, [1, 0, 0]);
    const mesh2 = new Mesh(this.gl, cubeMat2, cubeGeometry2);

    const orbiting = new Planet(this.gl, mesh2);
    orbiting.setParent(planet);
  }
}
