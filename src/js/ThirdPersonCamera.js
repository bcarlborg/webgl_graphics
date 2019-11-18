import glMatrix from './helpers/glm.js';
import Camera from './Camera.js';

export default class ThirdPersonCamera extends Camera {
  constructor(canvas) {
    super(canvas);
    this.followObject = null;
    this.position.followOffset = glMatrix.vec3.create();
  }

  setObjectToFollow(object) {
    this.followObject = object;
  }

  setCameraLocation() {
    glMatrix.vec3.scale(
      this.position.followOffset,
      this.followObject.position.forward,
      -10,
    );
    glMatrix.vec3.scaleAndAdd(
      this.position.followOffset,
      this.position.followOffset,
      this.followObject.position.up,
      3,
    );
    glMatrix.vec3.add(
      this.position.location,
      this.position.followOffset,
      this.followObject.position.location,
    );
  }

  setCameraOrientation() {
    glMatrix.vec3.copy(
      this.position.lookAtPoint,
      this.followObject.position.location,
    );
    glMatrix.vec3.copy(
      this.position.up,
      this.followObject.position.up,
    );
  }

  update() {
    this.setCameraLocation();
    this.setCameraOrientation();
    super.update();
  }
}
