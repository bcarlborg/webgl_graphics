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

  setParent(parent) {
    this.parent = parent;
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
    // update world matrix
    if (this.parent) {
      glMatrix.mat4.mul(this.worldMatrix, this.parent.worldMatrix, this.localMatrix);
    } else {
      glMatrix.mat4.copy(this.worldMatrix, this.localMatrix);
    }

    this.setUniforms({ worldMatrix: this.worldMatrix });

    // update all children
    this.children.forEach((child) => child.update());
  }

  draw() {
    super.draw();
    this.children.forEach((child) => child.draw());
  }
}
