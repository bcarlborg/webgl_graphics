import Material from '../../Material.js';
import Mesh from '../../Mesh.js';
import primitiveBuilders from '../../primitiveBuilders.js';
import Planet from './Planet.js';

export default class PlanetBuilder {
  constructor(gl) {
    this.gl = gl;
  }

  buildPlanet(parent, size, initialLoc) {
    const cubeMaterial = new Material(this.gl);
    cubeMaterial.setToBasicMaterial();

    const cubeGeometry = primitiveBuilders.buildColoredCube(size, initialLoc);
    const mesh = new Mesh(this.gl, cubeMaterial, cubeGeometry);

    const planet = new Planet(this.gl, mesh);
    if (parent) {
      planet.setParent(parent);
      planet.setRotationStart(initialLoc);
    }

    return planet;
  }
}
