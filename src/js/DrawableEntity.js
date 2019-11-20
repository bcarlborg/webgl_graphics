import GameEntity from './GameEntity.js';
import Mesh from './Mesh.js';

export default class DrawableEntity extends GameEntity {
  constructor(gl, parent, geometry, material) {
    super(parent);
    this.gl = gl;
    this.geometry = geometry;
    this.material = material;
    this.mesh = null;
    this.buildMesh();
  }

  setGeometry(geometry) {
    this.geometry = geometry;
    this.buildMesh();
  }

  setMaterial(material) {
    this.material = material;
    this.buildMesh();
  }

  buildMesh() {
    this.mesh = new Mesh(
      this.gl, this.material, this.geometry,
    );
  }

  update() {
    this.mesh.update();
    super.update();
  }

  draw() {
    this.mesh.draw(this.virtualUniforms);
    super.draw();
  }
}
