import Game from '../Game.js';
import Material from '../../Material.js';
import Geometry from '../../Geometry.js';
import primitiveBuilders from '../../primitiveBuilders.js';
import DrawableEntity from '../../DrawableEntity.js';

export default class FreeCreateGame extends Game {
  constructor(gl, camera) {
    super();
    this.gl = gl;
    this.camera = camera;
    this.initBox();
  }

  initBox() {
    const cubeMaterial = new Material(
      this.gl, 'procedural/mirror-vs.glsl', 'procedural/mirror-fs.glsl',
    );
    const planetVertices = primitiveBuilders.buildCube(1);
    const planetGeometry = new Geometry(this.gl, planetVertices);
    const entity = new DrawableEntity(this.gl, this.camera, planetGeometry, cubeMaterial);
    this.gameObjects.push(entity);
  }
}
