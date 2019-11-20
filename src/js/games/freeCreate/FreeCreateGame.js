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
    this.initSkyBox();
  }

  initSkyBox() {
    const material = new Material(this.gl, 'skybox-vs.glsl', 'skybox-fs.glsl');
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

    const skybox = new DrawableEntity(this.gl, this.camera, skyBoxGeometry, material);
    this.gameObjects.push(skybox);
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
