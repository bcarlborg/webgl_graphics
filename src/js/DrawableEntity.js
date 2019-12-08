import SceneGraphEntity from './SceneGraphEntity.js';
import Mesh from './Mesh.js';

export default class DrawableEntity extends SceneGraphEntity {
  constructor(gl, geometry, material) {
    super();
    this.gl = gl;
    this.geometry = geometry;
    this.material = material;
    this.mesh = null;

    this.virtualUniforms = {
      u_worldMatrix: this.worldMatrix,
    };
    this.buildMesh();
  }

  setUniform(key, value) {
    this.virtualUniforms[key] = value;
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
      this.gl, this.geometry, this.material,
    );
  }

  update() {
    this.mesh.update();
    super.update();
  }

  draw() {
    this.mesh.draw(this.virtualUniforms);
    this.children.forEach((child) => child.draw);
  }
}
