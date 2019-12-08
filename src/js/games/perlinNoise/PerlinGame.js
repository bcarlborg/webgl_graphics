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
    const planeVerts = primitiveBuilders.buildTriangleStripPlane(30, 150);
    // const planeVerts = primitiveBuilders.buildPlane(1);
    const planeGeometry = new Geometry(this.gl, planeVerts);
    const planeMaterial = new Material(this.gl, 'perlin-vs.glsl', 'perlin-fs.glsl');
    const plane = new DrawableEntity(this.gl, planeGeometry, planeMaterial);
    plane.scale(30);
    plane.moveAlongUp(-25);
    this.camera.moveAlongForward(-450);
    this.camera.moveAlongUp(80);
    this.camera.relativePitch(-10);
    this.gameObjects.push(plane);
  }
}
