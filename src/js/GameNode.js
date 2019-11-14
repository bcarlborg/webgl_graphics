import glMatrix from './helpers/glm.js';
import GameEntity from './GameEntity.js';

export default class GameNode extends GameEntity {
  constructor(gl, mesh) {
    super(gl, mesh);
    this.parent = null;
    this.drawable = Boolean(mesh);
    this.children = [];
    this.worldMatrix = glMatrix.mat4.create();
    this.localMatrix = glMatrix.mat4.create();
  }

  // should use child.setParent(parent) rather than
  // parent.addChild(child) to create a relationship
  setParent(parent) {
    this.parent = parent;
    this.parent.addChild(this);
  }

  addChild(child) {
    this.children.push(child);
  }

  removeChild(child) {
    this.chilren = this.children.filter((item) => item !== child);
  }

  removeParent() {
    this.parent.removeChild(this);
    this.parent = null;
  }


  update() {
    if (this.parent) {
      glMatrix.mat4.mul(this.worldMatrix, this.parent.worldMatrix, this.localMatrix);
    } else {
      glMatrix.mat4.copy(this.worldMatrix, this.localMatrix);
    }

    this.setUniforms({ worldMatrix: this.worldMatrix });

    this.children.forEach((child) => child.update());
  }

  draw(camera) {
    super.draw(camera);
    this.children.forEach((child) => child.draw(camera));
  }
}
