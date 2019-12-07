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
    const planeVerts = primitiveBuilders.buildTriangleStripPlane(1, 10);
    // const planeVerts = primitiveBuilders.buildPlane(1);
    const planeGeometry = new Geometry(this.gl, planeVerts);
    const planeMaterial = new Material(this.gl, 'perlin-vs.glsl', 'perlin-fs.glsl');
    const plane = new DrawableEntity(this.gl, planeGeometry, planeMaterial);
    plane.scale(10);
    plane.moveAlongUp(-3);
    this.gameObjects.push(plane);
  }
}
