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
    const deindexVertices = this.deindexVertices(torusVerts);
    twgl.primitives.makeRandomVertexColors(deindexVertices);
    return deindexVertices;
  }

  static buildPlane(size) {
    const planeVerts = twgl.primitives.createPlaneVertices(size, size);
    const deindexedPlane = this.deindexVertices(planeVerts);
    return deindexedPlane;
  }

  buildSkyBoxGeometry() {
    const position = { data: [] };
    position.data.push(
      -1, -1,
      1, -1,
      -1, 1,
      -1, 1,
      1, -1,
      1, 1,
    );
    position.numComponents = 2;

    const indices = { data: [] };
    indices.data.push(
      0, 2, 1,
      0, 1, 3,
    );
    indices.numComponents = 3;
  }

  static buildHomogeneousPlane() {
    const position = { data: [] };
    position.data.push(
      0, 0, 0, 1,
      1, 0, 0, 0,
      0, 0, 1, 0,
      -1, 0, -1, 0,
    );
    position.numComponents = 4;

    const homogeneous = { data: [] };
    homogeneous.data.push(
      0, 0, 0, 1,
      1, 0, 0, 0,
      0, 1, 0, 0,
      -1, -1, 0, 0,
    );
    homogeneous.numComponents = 4;

    const indices = { data: [] };
    indices.data.push(
      0, 2, 1,
      0, 3, 2,
      0, 1, 3,
    );
    indices.numComponents = 3;

    const normal = { data: [] };
    for (let ii = 0; ii < position.data.length; ii += 3) {
      normal.data.push(0, 1, 0);
    }
    normal.numComponents = 3;

    const plane = {
      indices,
      position,
      homogeneous,
      normal,
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
