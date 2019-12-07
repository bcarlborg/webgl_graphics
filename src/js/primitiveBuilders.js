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

  static buildTriangleStripPlane() {
    const subDivisions = 10;
    const totalWidth = 1;

    const xStart = -(0.5 * totalWidth);
    const zStart = -(0.5 * totalWidth);
    const triangleWidth = totalWidth / subDivisions;

    const positionVerts = [];
    const normalVerts = [];
    const colorVerts = [];
    for (let i = 0; i < subDivisions; i++) {
      // positionVerts.push(-0.5, 0, -0.5);
      positionVerts.push(
        xStart + (i * triangleWidth),
        0,
        zStart + (0 * triangleWidth),
      );

      // positionVerts.push(-0.5, 0, 0.5);
      positionVerts.push(
        xStart + (i * triangleWidth),
        0,
        zStart + (0 * triangleWidth) + triangleWidth,
      );

      // positionVerts.push(0.5, 0, -0.5);
      positionVerts.push(
        xStart + (i * triangleWidth) + triangleWidth,
        0,
        zStart + (0 * triangleWidth),
      );

      // triangle 2
      positionVerts.push(
        xStart + (i * triangleWidth),
        0,
        zStart + (0 * triangleWidth) + triangleWidth,
      );

      positionVerts.push(
        xStart + (i * triangleWidth) + triangleWidth,
        0,
        zStart + (0 * triangleWidth) + triangleWidth,
      );

      positionVerts.push(
        xStart + (i * triangleWidth) + triangleWidth,
        0,
        zStart + (0 * triangleWidth),
      );

      normalVerts.push(0, 1.0, 0);
      normalVerts.push(0, 1.0, 0);
      normalVerts.push(0, 1.0, 0);
      normalVerts.push(0, 1.0, 0);
      normalVerts.push(0, 1.0, 0);
      normalVerts.push(0, 1.0, 0);

      colorVerts.push(255, 0, 0, 255);
      colorVerts.push(255, 0, 0, 255);
      colorVerts.push(255, 0, 0, 255);
      colorVerts.push(255, 0, 0, 255);
      colorVerts.push(255, 0, 0, 255);
      colorVerts.push(255, 0, 0, 255);
    }


    // const positionVerts = [];
    // positionVerts.push(-0.5, 0, -0.5);
    // positionVerts.push(-0.5, 0, 0.5);
    // positionVerts.push(0.5, 0, -0.5);
    const typedPositionArray = twgl.primitives.createAugmentedTypedArray(3, positionVerts.length);
    typedPositionArray.push(...positionVerts);


    // const normalVerts = [];
    // normalVerts.push(0, 1.0, 0);
    // normalVerts.push(0, 1.0, 0);
    // normalVerts.push(0, 1.0, 0);
    const typedNormalArray = twgl.primitives.createAugmentedTypedArray(3, normalVerts.length);
    typedNormalArray.push(...normalVerts);


    // const colorVerts = [];
    // colorVerts.push(255, 0, 0, 255);
    // colorVerts.push(255, 0, 0, 255);
    // colorVerts.push(255, 0, 0, 255);
    const typedColorArray = twgl.primitives.createAugmentedTypedArray(4, colorVerts.length);
    typedColorArray.push(...colorVerts);

    const trianglePlane = {
      color: typedColorArray, normal: typedNormalArray, position: typedPositionArray,
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
