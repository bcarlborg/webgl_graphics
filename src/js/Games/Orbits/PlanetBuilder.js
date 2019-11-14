import Material from '../../Material.js';
import Mesh from '../../Mesh.js';
import primitiveBuilders from '../../primitiveBuilders.js';
import Planet from './Planet.js';

export default class PlanetBuilder {
  constructor(gl) {
    this.gl = gl;
    this.vertColors = [1, 0, 0];
  }

  setVertColorsToRandom() {
    this.vertColors = [
      Math.random(),
      Math.random(),
      Math.random(),
    ];
  }

  buildPlanet(parent, size, initialLoc) {
    this.setVertColorsToRandom();
    const cubeMaterial = new Material(this.gl);
    cubeMaterial.setToBasicMaterial();

    const planetGeometry = primitiveBuilders.buildCube(size, this.vertColors);
    primitiveBuilders.addVertColorToGeometry(planetGeometry, this.vertColors);
    console.log(planetGeometry);
    const mesh = new Mesh(this.gl, cubeMaterial, planetGeometry);

    const planet = new Planet(this.gl, mesh);
    if (parent) {
      planet.setParent(parent);
      planet.setRotationStart(initialLoc);
    }

    return planet;
  }
}
