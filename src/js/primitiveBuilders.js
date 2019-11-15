import * as twgl from '../lib/twgl-full.module.js';

export default class primitiveBuilders {
  static buildCube(size) {
    const cubeVerts = twgl.primitives.createCubeVertices(size);
    return this.deindexVertices(cubeVerts);
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

  static buildHomogeneousPlane(size) {
    const planeVerts = twgl.primitives.createPlaneVertices(size, size);
    const deindexedPlane = this.deindexVertices(planeVerts);
    console.log('are we here', deindexedPlane);
    const homogeneous = [];
    for (let ii = 0; ii < deindexedPlane.position.length; ii += 3) {
      const xPos = planeVerts.position[0];
      const yPos = planeVerts.position[1];
      const zPos = planeVerts.position[2];
      homogeneous.push(xPos, zPos, yPos, 1.0);
    }
    deindexedPlane.homogeneous = new Float32Array(homogeneous);
    return deindexedPlane;
  }

  static deindexVertices(vertices) {
    return twgl.primitives.deindexVertices(vertices);
  }

  static addRandomColorsToVertices(vertices) {
    return twgl.primitives.makeRandomVertexColors(vertices);
  }
}
