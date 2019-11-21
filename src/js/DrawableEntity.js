import SceneGraphEntity from './SceneGraphEntity.js';
import Mesh from './Mesh.js';

export default class DrawableEntity extends SceneGraphEntity {
  constructor(gl, geometry, material) {
    super();
    this.gl = gl;
    this.geometry = geometry;
    this.material = material;
    this.mesh = null;

    this.virtualUniforms = {};
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

  // maybe will want a function
  // get virtualUniformsFromParent() {} that checks if
  // the parent has virtual uniforms, and if so, grabs them

  update() {
    this.mesh.update();
    super.update();
  }

  draw() {
    this.mesh.draw(this.virtualUniforms);
    super.draw();
  }
}
