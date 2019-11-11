import glMatrix from './helpers/glm.js';

export default class GameNode {
  // TODO -- implement materials
  // TODO -- implement meshes
  // TODO -- implement implement scene graph
  // TODO -- implement camera
  // TODO -- implement textures
  // TODO -- implement barimetric coordinates
  constructor(gl, mesh) {
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

    // update all children
    this.children.forEach((child) => child.update());
  }

  draw() {
  }
}
