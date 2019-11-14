import * as twgl from '../lib/twgl-full.module.js';

const primitiveBuilders = {
  buildCube: (size) => (twgl.primitives.createCubeVertices(size)),
  buildCubeBuffer: (gl, size) => (twgl.primitives.createCubeBufferInfo(gl, size)),

  buildColoredCube: (size, rgbVec) => {
    const cubeGeometry = twgl.primitives.createCubeVertices(size);
    cubeGeometry.vertColor = { numComponents: 4, data: [] };
    for (let i = 0; i < cubeGeometry.indices.length; i += 6) {
      const getRandom = (index) => (Math.random() * rgbVec[index]);
      const color = [getRandom(0), getRandom(1), getRandom(2), 1];
      for (let j = 0; j < 6; j++) {
        cubeGeometry.vertColor.data.push(...color);
      }
    }
    console.log(cubeGeometry);
    return cubeGeometry;
  },

  buildPlane: () => (twgl.primitives.createPlaneVertices(10, 10)),

  buildColoredTorus: (radius, thickness, radialSubdivisions, bodySubdivisions, rgbVec) => {
    const torusGeometry = twgl.primitives.createTorusVertices(
      radius, thickness, radialSubdivisions, bodySubdivisions,
    );
    torusGeometry.vertColor = { numComponents: 4, data: [] };
    torusGeometry.position.forEach(() => {
      torusGeometry.vertColor.data.push(
        Math.random() * rgbVec[0],
        Math.random() * rgbVec[1],
        Math.random() * rgbVec[2],
        1.0,
      );
    });
    return torusGeometry;
  },
};

export default primitiveBuilders;
