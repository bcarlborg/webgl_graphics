export default class GameEntity {
  constructor(gl, mesh) {
    this.gl = gl;
    this.mesh = mesh;
    this.virtualUniforms = {};
  }

  setUniforms(uniforms) {
    Object.assign(this.virtualUniforms, uniforms);
  }

  update() {
    this.mesh.update();
  }

  draw(camera) {
    if (camera) {
      Object.assign(this.virtualUniforms, camera.virtualUniforms);
    }
    this.mesh.draw(this.virtualUniforms);
  }
}
