import Game from '../Game.js';
import primitiveBuilders from '../../primitiveBuilders.js';
import Material from '../../Material.js';
import Geometry from '../../Geometry.js';
import MountainPlane from './objects/MountainPlane.js';
import GameTime from '../../GameTime.js';

export default class PerlinGame extends Game {
  constructor(gl, camera) {
    super();
    this.gl = gl;
    this.camera = camera;
    this.initPlane();
    this.gameTime = new GameTime();
    console.log(this.gameTime);
  }

  initPlane() {
    const planeVerts = primitiveBuilders.buildTriangleStripPlane(34, 100);
    const planeGeometry = new Geometry(this.gl, planeVerts);
    const planeMaterial = new Material(this.gl, 'perlin-vs.glsl', 'perlin-fs.glsl');
    const plane = new MountainPlane(this.gl, planeGeometry, planeMaterial);
    plane.scale(30);
    plane.moveAlongUp(-25);
    this.camera.moveAlongForward(-550);
    this.camera.moveAlongUp(300);
    this.camera.relativePitch(-17);
    this.gameObjects.push(plane);
  }
}
