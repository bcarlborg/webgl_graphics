// import * as twgl from '../../../lib/twgl-full.module.js';
import glMatrix from '../../helpers/glm.js';
import GameEntity from '../../GameEntity.js';
import ProgramBuilder from '../../ProgramBuilder.js';
import primitiveBuilders from '../../primitiveBuilders.js';
import Mesh from '../../Mesh.js';

import Game from '../Game.js';

export default class OrbitsGame extends Game {
  constructor(gl, canvas) {
    super();
    this.gl = gl;
    this.initObjects(canvas);
  }

  initObjects(canvas) {
    const progBuilder = new ProgramBuilder(this.gl);
    const programInfo = progBuilder.buildProgram('base-vs.glsl', 'base-fs.glsl');
    console.log('program', programInfo);

    const cubeGeometry = primitiveBuilders.buildColoredCube(0.5, [0, 1, 0]);
    console.log('cube geometry', cubeGeometry);

    const mesh = new Mesh(this.gl, programInfo, cubeGeometry);

    const mWorld = new Float32Array(16);
    const mView = new Float32Array(16);
    const mProj = new Float32Array(16);

    glMatrix.mat4.identity(mWorld);
    glMatrix.mat4.identity(mView);
    glMatrix.mat4.identity(mProj);

    glMatrix.mat4.lookAt(mView, [0, 0, -5], [0, 0, 0], [0, 1, 0]);
    glMatrix.mat4.perspective(
      mProj, glMatrix.glMatrix.toRadian(45), canvas.height / canvas.width, 0.1, 9000.0,
    );
    const uniforms = { mWorld, mView, mProj };

    const gameEntity = new GameEntity(this.gl, mesh);
    gameEntity.setUniforms(uniforms);
    this.gameObjects.push(gameEntity);
  }
}
