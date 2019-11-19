import SpaceShip from './SpaceShip.js';
import SkyBox from '../../SkyBox.js';
import Material from '../../Material.js';
import Mesh from '../../Mesh.js';
import InfiniteGround from './InfiniteGround.js';
import primitiveBuilders from '../../primitiveBuilders.js';
import Planet from './Planet.js';
import Geometry from '../../Geometry.js';

export default class PlanetBuilder {
  constructor(gl) {
    this.gl = gl;
  }

  buildSpaceShip() {
    const spaceshipMaterial = new Material(this.gl, 'base-vs.glsl', 'base-fs.glsl');
    const spaceShipVerts = primitiveBuilders.buildCube(1);
    const spaceShipGeometry = new Geometry(this.gl, spaceShipVerts);
    const mesh = new Mesh(this.gl, spaceshipMaterial, spaceShipGeometry);
    return new SpaceShip(this.gl, mesh);
  }

  buildTestPlanet(parent, size, initialLoc) {
    const cubeMaterial = new Material(
      this.gl, 'procedural/test-vs.glsl', 'procedural/test-fs.glsl',
    );
    return this.buildPlanet(cubeMaterial, parent, size, initialLoc);
  }

  buildPlanet(material, parent, size, initialLoc) {
    const planetVertices = primitiveBuilders.buildCube(size);
    const planetGeometry = new Geometry(this.gl, planetVertices);
    const mesh = new Mesh(this.gl, material, planetGeometry);

    const planet = new Planet(this.gl, mesh);
    if (parent) {
      planet.setParent(parent);
      planet.setRotationStart(initialLoc);
    }
    return planet;
  }

  buildSkyBox() {
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
    const mesh = new Mesh(this.gl, material, skyBoxGeometry);

    const skybox = new SkyBox(this.gl, mesh);
    return skybox;
  }

  buildInfinitePlane() {
    const homogeneousPlane = primitiveBuilders.buildHomogeneousPlane();
    const planeGeometry = new Geometry(this.gl, homogeneousPlane);

    const planeMaterial = new Material(this.gl);
    planeMaterial.setToInfiniteGroundMaterial('wavyGrid.jpg');

    const mesh = new Mesh(this.gl, planeMaterial, planeGeometry);
    const plane = new InfiniteGround(this.gl, mesh);

    return plane;
  }
}
