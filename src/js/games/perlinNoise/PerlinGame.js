import Game from '../Game.js';
import primitiveBuilders from '../../primitiveBuilders.js';
import Material from '../../Material.js';
import Geometry from '../../Geometry.js';
import DrawableEntity from '../../DrawableEntity.js';

export default class PerlinGame extends Game {
  constructor(gl, camera) {
    super();
    this.gl = gl;
    this.camera = camera;
    this.initPlane();
  }

  initPlane() {
    const planeVerts = primitiveBuilders.buildCube(5);
    const planeGeometry = new Geometry(this.gl, planeVerts);
    const planeMaterial = new Material(this.gl, 'base-vs.glsl', 'base-fs.glsl');
    const plane = new DrawableEntity(this.gl, planeGeometry, planeMaterial);
    this.gameObjects.push(plane);
  }
}
