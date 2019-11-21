import GameEntity from '../GameEntity.js';
import glMatrix from '../helpers/glm.js';

export default class DirectionLight extends GameEntity {
  constructor(parent) {
    super(parent);
    const directionLightUniforms = {
      u_reverseLightDirection: glMatrix.vec3.create(),
    };
    Object.assign(this.virtualUniforms, directionLightUniforms);

    this.setPosition(1, 1, -11);
    // this.setTolookAt(0, 0, 0);
  }

  initLightInfo() {
    glMatrix.vec3.copy(
      this.lightInfo.lightDirection,
      this.initialLightInfo.lightDirection,
    );
  }

  setUniformsFromLocalInfo() {
    glMatrix.vec3.scale(
      this.virtualUniforms.u_reverseLightDirection,
      this.position.forward,
      -1,
    );
  }

  update() {
    this.setUniformsFromLocalInfo();
    super.update();
  }
}
