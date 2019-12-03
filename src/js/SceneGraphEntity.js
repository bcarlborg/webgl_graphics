import PositionableEntity from './PositionableEntity.js';
import glMatrix from './helpers/glm.js';

export default class SceneGraphEntity extends PositionableEntity {
  constructor() {
    super();
    this.worldMatrix = glMatrix.mat4.create();
    this.localMatrix = glMatrix.mat4.create();
    this.parent = null;
    this.children = [];
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

  setWorldAndLocalMatrices() {
    glMatrix.mat4.copy(
      this.localMatrix, this.positionMatrix,
    );

    if (this.parent) {
      glMatrix.mat4.multiply(
        this.worldMatrix,
        this.parent.worldMatrix,
        this.localMatrix,
      );
    } else {
      glMatrix.mat4.copy(
        this.worldMatrix,
        this.localMatrix,
      );
    }
  }

  update() {
    super.update();
    this.setWorldAndLocalMatrices();
    this.children.forEach((child) => child.update());
  }
}
