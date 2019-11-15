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
    cubeMaterial.setToWoodenMaterial();

    const planetVertices = primitiveBuilders.buildCube(size);
    const coloredPlanetVertices = primitiveBuilders.addRandomColorsToVertices(planetVertices);
    const mesh = new Mesh(this.gl, cubeMaterial, coloredPlanetVertices);

    const planet = new Planet(this.gl, mesh);
    if (parent) {
      planet.setParent(parent);
      planet.setRotationStart(initialLoc);
    }

    const planeVerts = primitiveBuilders.buildHomogeneousPlane(100);
    console.log(planeVerts);

    return planet;
  }
}
