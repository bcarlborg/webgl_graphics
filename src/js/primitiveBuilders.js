import * as twgl from '../lib/twgl-full.module.js';

export default class primitiveBuilders {
  static buildCube(size) {
    const cubeVerts = twgl.primitives.createCubeVertices(size);
    const deindexedCube = this.deindexVertices(cubeVerts);
    const newTexCoords = deindexedCube.texcoord.map((coord) => coord * 0.25);
    deindexedCube.texcoord = newTexCoords;
    return deindexedCube;
  }

  static buildTorus(size) {
    const totalRadius = size / 2;
    const radius = 0.8 * totalRadius;
    const thickness = totalRadius - radius;
    const radialSubdivisions = 10;
    const bodySubdivisions = 10;

    const torusVerts = twgl.primitives.createTorusVertices(
      radius, thickness, radialSubdivisions, bodySubdivisions,
    );
    return this.deindexVertices(torusVerts);
  }

  static buildPlane(size) {
    const planeVerts = twgl.primitives.createPlaneVertices(size, size);
    const deindexedPlane = this.deindexVertices(planeVerts);
    return deindexedPlane;
  }

  static buildHomogeneousPlane() {
    const size = 50;
    const origin = [0, 0, 0];
    const idealP1 = [0, 0, size];
    const idealP2 = [-size, 0, -size];
    const idealP3 = [size, 0, -size];

    const position = [];
    position.push(
      ...origin, ...idealP2, ...idealP1,
      ...origin, ...idealP1, ...idealP3,
      ...origin, ...idealP3, ...idealP2,
    );

    const homogeneous = [];
    const originW = 1;
    const idealW = 0;
    for (let ii = 0; ii < position.length; ii += 9) {
      homogeneous.push(
        position[ii], position[ii + 1], position[ii + 2], originW,
        position[ii + 3], position[ii + 4], position[ii + 5], idealW,
        position[ii + 6], position[ii + 7], position[ii + 8], idealW,
      );
    }

    const normal = [];
    for (let ii = 0; ii < position.length; ii += 3) {
      normal.push(0, -1, 0);
    }

    const plane = {
      position: new Float32Array(position),
      homogeneous: new Float32Array(homogeneous),
      normal: new Float32Array(normal),
    };

    return plane;
  }

  static deindexVertices(vertices) {
    return twgl.primitives.deindexVertices(vertices);
  }

  static addRandomColorsToVertices(vertices) {
    return twgl.primitives.makeRandomVertexColors(vertices);
  }
}
