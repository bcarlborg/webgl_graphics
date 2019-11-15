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
    const origin = [0, 0, 0, 1];
    const idealP1 = [-size, -size, 0, 0];
    const idealP2 = [-size, size, 0, 0];
    const idealP3 = [size, size, 0, 0];
    const idealP4 = [size, -size, 0, 0];

    const homogeneous = [];
    homogeneous.push(
      // 1 2
      // ...origin, ...idealP1, ...idealP2,
      ...idealP2, ...origin, ...idealP1,
      // ...idealP1, ...idealP2, ...origin,

      // 2 3
      ...origin, ...idealP2, ...idealP3,
      // ...idealP3, ...origin, ...idealP2,
      // ...idealP2, ...idealP3, ...origin,

      // 3 4
      // ...origin, ...idealP3, ...idealP4,
      ...idealP4, ...origin, ...idealP3,
      // ...idealP3, ...idealP4, ...origin,
     
      // 4 1
      ...origin, ...idealP4, ...idealP1,
      // ...idealP1, ...origin, ...idealP4,
      // ...idealP4, ...idealP1, ...origin,
    );

    const position = [];
    for (let ii = 0; ii < homogeneous.length; ii += 4) {
      position.push(
        homogeneous[ii], homogeneous[ii + 2], homogeneous[ii + 1],
      );
    }

    const normal = [];
    for (let ii = 0; ii < position.length; ii += 3) {
      normal.push(0, 1, 0);
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
