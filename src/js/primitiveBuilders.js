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

  static deindexVertices(vertices) {
    return twgl.primitives.deindexVertices(vertices);
  }

  static addRandomColorsToVertices(vertices) {
    return twgl.primitives.makeRandomVertexColors(vertices);
  }
}
