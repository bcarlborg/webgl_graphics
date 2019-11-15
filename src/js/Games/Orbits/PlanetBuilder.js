import Material from '../../Material.js';
import Mesh from '../../Mesh.js';
import InfiniteGround from './InfiniteGround.js';
import primitiveBuilders from '../../primitiveBuilders.js';
import Planet from './Planet.js';

export default class PlanetBuilder {
  constructor(gl) {
    this.gl = gl;
  }

  buildWoodPlanet(parent, size, initialLoc) {
    const cubeMaterial = new Material(this.gl);
    cubeMaterial.setToWoodenMaterial();
    return this.buildPlanet(cubeMaterial, parent, size, initialLoc);
  }

  buildColoredPlanet(parent, size, initialLoc) {
    const cubeMaterial = new Material(this.gl);
    cubeMaterial.setToBasicMaterial();
    return this.buildPlanet(cubeMaterial, parent, size, initialLoc);
  }

  buildWirePlanet(parent, size, initialLoc) {
    const cubeMaterial = new Material(this.gl);
    cubeMaterial.setToBasicMaterial();
    cubeMaterial.setToTexturedMaterial('computerTex.jpg');
    return this.buildPlanet(cubeMaterial, parent, size, initialLoc);
  }

  buildPlanet(material, parent, size, initialLoc) {
    const planetVertices = primitiveBuilders.buildCube(size);
    const coloredPlanetVertices = primitiveBuilders.addRandomColorsToVertices(planetVertices);
    const mesh = new Mesh(this.gl, material, coloredPlanetVertices);

    const planet = new Planet(this.gl, mesh);
    if (parent) {
      planet.setParent(parent);
      planet.setRotationStart(initialLoc);
    }
    return planet;
  }

  buildInfinitePlane() {
    const planetVertices = primitiveBuilders.buildPlane(10);
    const coloredPlaneVertices = primitiveBuilders.addRandomColorsToVertices(planetVertices);
    const planeMaterial = new Material(this.gl);
    planeMaterial.setToInfiniteGroundMaterial('wavyGrid.jpg');
    const mesh = new Mesh(this.gl, planeMaterial, coloredPlaneVertices);
    const plane = new InfiniteGround(this.gl, mesh);
    return plane;
  }
}
