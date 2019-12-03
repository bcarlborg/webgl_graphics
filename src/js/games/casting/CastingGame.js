import Game from '../Game.js';
import Material from '../../Material.js';
import Geometry from '../../Geometry.js';
import primitiveBuilders from '../../primitiveBuilders.js';
import DrawableEntity from '../../DrawableEntity.js';
import Snowman from './objects/Snowman.js';
import ClippedQuadric from '../../ClippedQuadric.js';

export default class CastingGame extends Game {
  constructor(gl, camera) {
    super();
    this.gl = gl;
    this.camera = camera;
    this.initSkyBox();
    this.initInfiniteGround();
    this.initQuadrics();
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
    const infiniteFloor = new ClippedQuadric(2);
    infiniteFloor.setToInfinitePlane();
    infiniteFloor.moveAlongUp(-10);
    infiniteFloor.setColor(0.5, 0.8, 0.8);
    this.gameObjects.push(infiniteFloor);
  }

  initQuadrics() {
    const snowman1 = new Snowman(0);
    snowman1.setColor(0.8, 0.1, 0.1);
    this.gameObjects.push(snowman1);

    const snowman2 = new Snowman(1);
    snowman2.moveAlongLateral(10);
    snowman2.setColor(0.8, 0.1, 0.1);
    this.gameObjects.push(snowman2);
  }
}
