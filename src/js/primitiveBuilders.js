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
    console.log(deindexedPlane);
    return deindexedPlane;
  }

  static buildTriangleStripPlane(totalWidth, subDivisions) {
    const xStart = -(0.5 * totalWidth);
    const zStart = -(0.5 * totalWidth);
    const triangleWidth = totalWidth / subDivisions;

    const positionVerts = [];
    const normalVerts = [];
    const colorVerts = [];
    const barycentricVerts = [];
    // for loop that pushes two triangles forming a square in each row and column
    // of the total square
    for (let i = 0; i < subDivisions; i++) {
      for (let j = 0; j < subDivisions; j++) {
        // triangle 1
        positionVerts.push(
          xStart + (i * triangleWidth),
          0,
          zStart + (j * triangleWidth),
        );
        positionVerts.push(
          xStart + (i * triangleWidth),
          0,
          zStart + (j * triangleWidth) + triangleWidth,
        );
        positionVerts.push(
          xStart + (i * triangleWidth) + triangleWidth,
          0,
          zStart + (j * triangleWidth),
        );

        barycentricVerts.push(1, 0, 0);
        barycentricVerts.push(0, 1, 0);
        barycentricVerts.push(0, 0, 1);

        normalVerts.push(0, 1.0, 0);
        normalVerts.push(0, 1.0, 0);
        normalVerts.push(0, 1.0, 0);

        colorVerts.push(255, 0, 0, 255);
        colorVerts.push(255, 0, 0, 255);
        colorVerts.push(255, 0, 0, 255);

        // triangle 2
        positionVerts.push(
          xStart + (i * triangleWidth),
          0,
          zStart + (j * triangleWidth) + triangleWidth,
        );
        positionVerts.push(
          xStart + (i * triangleWidth) + triangleWidth,
          0,
          zStart + (j * triangleWidth) + triangleWidth,
        );
        positionVerts.push(
          xStart + (i * triangleWidth) + triangleWidth,
          0,
          zStart + (j * triangleWidth),
        );

        barycentricVerts.push(1, 0, 0);
        barycentricVerts.push(0, 1, 0);
        barycentricVerts.push(0, 0, 1);

        normalVerts.push(0, 1.0, 0);
        normalVerts.push(0, 1.0, 0);
        normalVerts.push(0, 1.0, 0);

        colorVerts.push(255, 0, 0, 255);
        colorVerts.push(255, 0, 0, 255);
        colorVerts.push(255, 0, 0, 255);
      }
    }

    const typedPositionArray = twgl.primitives.createAugmentedTypedArray(
      3, positionVerts.length / 3,
    );
    typedPositionArray.push(...positionVerts);

    const typedNormalArray = twgl.primitives.createAugmentedTypedArray(
      3, normalVerts.length / 3,
    );
    typedNormalArray.push(...normalVerts);

    const typedColorArray = twgl.primitives.createAugmentedTypedArray(
      4, colorVerts.length / 4,
    );
    typedColorArray.push(...colorVerts);

    const typedBarycentricArray = twgl.primitives.createAugmentedTypedArray(
      3, barycentricVerts.length / 3,
    );
    typedBarycentricArray.push(...barycentricVerts);

    const trianglePlane = {
      color: typedColorArray,
      normal: typedNormalArray,
      position: typedPositionArray,
      barycentric: typedBarycentricArray,
    };
    return trianglePlane;
  }

  static buildSkyBoxPlane() {
    const position = [];
    position.push(
      -1, -1,
      1, -1,
      -1, 1,
      -1, 1,
      1, -1,
      1, 1,
    );
    const positionFloatArray = new Float32Array(position);
    return { position: positionFloatArray };
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
