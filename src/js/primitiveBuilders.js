import * as twgl from '../lib/twgl-full.module.js';

const primitiveBuilders = {
  buildCube: (size) => (twgl.primitives.createCubeVertices(size)),

  buildPlane: () => (twgl.primitives.createPlaneVertices(10, 10)),

  buildTorus: (size) => {
    const totalRadius = size / 2;
    const radius = 0.8 * totalRadius;
    const thickness = totalRadius - radius;
    const radialSubdivisions = 10;
    const bodySubdivisions = 10;

    const torusGeometry = twgl.primitives.createTorusVertices(
      radius, thickness, radialSubdivisions, bodySubdivisions,
    );

    return torusGeometry;
  },

  addVertColorToGeometry: (geometry, rgbVec) => {
    // eslint-disable-next-line
    geometry.vertColor = { numComponents: 4, data: [] };
    for (let i = 0; i < geometry.indices.length; i += 6) {
      const getRandom = (index) => (Math.random() * rgbVec[index]);
      const color = [getRandom(0), getRandom(1), getRandom(2), 1];
      for (let j = 0; j < 6; j++) {
        geometry.vertColor.data.push(...color);
      }
    }
  },
};

export default primitiveBuilders;
