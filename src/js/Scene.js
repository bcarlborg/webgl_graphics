import * as twgl from '../lib/twgl-full.module.js';
import glMatrix from './helpers/glm.js';
import GameEntity from './GameEntity.js';
import Mesh from './Mesh.js';

export default class Scene {
  constructor(gl, canvas) {
    this.canvas = canvas;
    this.gl = gl;
    this.GameObjects = [];
    this.init(canvas);
  }

  update() {
  }

  draw() {
    this.GameObjects.forEach((object) => object.draw());
  }

  init() {
    const { gl } = this;

    // eslint-disable-next-line
    const shaderSource = ShaderSource.source;
    const programInfo = twgl.createProgramInfo(gl,
      [shaderSource['base-vs.glsl'], shaderSource['base-fs.glsl']]);

    const cubeGeometry = twgl.primitives.createCubeVertices(0.5);
    cubeGeometry.vertColor = { numComponents: 4, data: [] };
    cubeGeometry.position.forEach(() => {
      cubeGeometry.vertColor.data.push(Math.random(), Math.random(), Math.random(), 1.0);
    });

    const mesh = new Mesh(gl, programInfo, cubeGeometry);

    const mWorld = new Float32Array(16);
    const mView = new Float32Array(16);
    const mProj = new Float32Array(16);

    glMatrix.mat4.identity(mWorld);
    glMatrix.mat4.identity(mView);
    glMatrix.mat4.identity(mProj);

    glMatrix.mat4.lookAt(mView, [0, 0, -5], [0, 0, 0], [0, 1, 0]);
    glMatrix.mat4.perspective(
      mProj, glMatrix.glMatrix.toRadian(45), this.canvas.height / this.canvas.width, 0.1, 9000.0,
    );
    const uniforms = { mWorld, mView, mProj };

    const gameEntity = new GameEntity(this.gl, mesh);
    gameEntity.setUniforms(uniforms);

    this.GameObjects.push(gameEntity);
  }
}
