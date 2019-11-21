import GameEntity from './GameEntity.js';
import glMatrix from './helpers/glm.js';

export default class Camera extends GameEntity {
  constructor(canvas) {
    super();
    this.canvas = canvas;

    this.position.lookAtPoint = glMatrix.vec3.create();

    const cameraUniforms = {
      u_viewDirectionProjectionInverse: glMatrix.mat4.create(),
      u_projectionMatrix: glMatrix.mat4.create(),
      u_viewMatrix: glMatrix.mat4.create(),
      u_cameraPosition: glMatrix.vec3.create(),
    };

    Object.assign(this.virtualUniforms, cameraUniforms);
  }

  setPerspective() {
    const { u_projectionMatrix } = this.virtualUniforms;
    const fov = glMatrix.glMatrix.toRadian(45);
    const aspect = this.canvas.width / this.canvas.height;
    const near = 0.01;
    const far = 10000;

    glMatrix.mat4.perspective(
      u_projectionMatrix, fov, aspect, near, far,
    );
  }

  // setTolookAt(position) {
  //   if (position) {
  //     glMatrix.vec3.set(
  //       this.position.lookAtPoint, ...position,
  //     );
  //   } else {
  //     glMatrix.vec3.add(
  //       this.position.lookAtPoint,
  //       this.position.location,
  //       this.position.forward,
  //     );
  //   }
  //   glMatrix.mat4.targetTo(
  //     this.localMatrix,
  //     this.position.location,
  //     this.position.lookAtPoint,
  //     this.position.up,
  //   );
  // }

  updateUniformsFromLocalValues() {
    glMatrix.mat4.invert(
      this.virtualUniforms.u_viewMatrix,
      this.localMatrix,
    );

    glMatrix.vec3.copy(
      this.virtualUniforms.u_cameraPosition,
      this.position.location,
    );

    this.updateViewDirectionProjection();
  }

  updateViewDirectionProjection() {
    const { u_viewDirectionProjectionInverse } = this.virtualUniforms;
    // get the view direction direction
    glMatrix.mat4.copy(
      u_viewDirectionProjectionInverse,
      this.virtualUniforms.u_viewMatrix,
    );
    // set translation to zero
    u_viewDirectionProjectionInverse[12] = 0;
    u_viewDirectionProjectionInverse[13] = 0;
    u_viewDirectionProjectionInverse[14] = 0;

    // view direction projection
    glMatrix.mat4.multiply(
      u_viewDirectionProjectionInverse,
      this.virtualUniforms.u_projectionMatrix,
      u_viewDirectionProjectionInverse,
    );

    // view direction projection inverse
    glMatrix.mat4.invert(
      u_viewDirectionProjectionInverse,
      u_viewDirectionProjectionInverse,
    );
  }

  update() {
    const beforeChildrenUpdate = () => {
      this.setPerspective();
      this.updateUniformsFromLocalValues();
    };
    super.update(beforeChildrenUpdate);
  }
}
