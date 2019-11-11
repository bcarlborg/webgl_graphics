import * as twgl from '../lib/twgl-full.module.js';

const primitiveBuilders = {
  buildCube: (size) => (twgl.primitives.createCubeVertices(size)),

  buildColoredCube: (size, rgbVec) => {
    const cubeGeometry = twgl.primitives.createCubeVertices(size);
    cubeGeometry.vertColor = { numComponents: 4, data: [] };
    cubeGeometry.position.forEach(() => {
      cubeGeometry.vertColor.data.push(
        Math.random() * rgbVec[0],
        Math.random() * rgbVec[1],
        Math.random() * rgbVec[2],
        1.0,
      );
    });
    return cubeGeometry;
  },
};

export default primitiveBuilders;
