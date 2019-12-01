import Game from '../Game.js';
import Material from '../../Material.js';
import Geometry from '../../Geometry.js';
import primitiveBuilders from '../../primitiveBuilders.js';
import DrawableEntity from '../../DrawableEntity.js';

export default class CastingGame extends Game {
  constructor(gl, camera) {
    super();
    this.gl = gl;
    this.camera = camera;
    // this.initLights();
    this.initSkyBox();
  }

  initSkyBox() {
    const material = new Material(this.gl, 'procedural/quad-vs.glsl', 'procedural/trace-fs.glsl');
    material.setSkyBoxTextureFromFiles([
      'interstellar_px.jpg',
      'interstellar_nx.jpg',
      'interstellar_py.jpg',
      'interstellar_ny.jpg',
      'interstellar_pz.jpg',
      'interstellar_nz.jpg',
    ]);

    const quad = primitiveBuilders.buildSkyBoxPlane();
    const skyBoxGeometry = new Geometry(this.gl, quad, { '2d': true });

    const skybox = new DrawableEntity(this.gl, skyBoxGeometry, material);
    this.gameObjects.push(skybox);
  }
}
