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
    this.initInfiniteGround();
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

  initInfiniteGround() {
    const planeMaterial = new Material(this.gl, 'infinite-ground-vs.glsl', 'infinite-ground-fs.glsl');

    const homogeneousPlane = primitiveBuilders.buildHomogeneousPlane();
    const planeGeometry = new Geometry(this.gl, homogeneousPlane);
    planeMaterial.setTextureFromFile('wavyGrid.jpg');

    const infinitePlane = new DrawableEntity(this.gl, planeGeometry, planeMaterial);
    infinitePlane.moveAlongUp(-10);
    this.gameObjects.push(infinitePlane);
  }
}
