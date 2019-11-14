import * as twgl from '../lib/twgl-full.module.js';

export default class primitiveBuilders {
  static buildCube(size) {
    return twgl.primitives.createCubeVertices(size);
  }

  static buildTorus(size) {
    const totalRadius = size / 2;
    const radius = 0.8 * totalRadius;
    const thickness = totalRadius - radius;
    const radialSubdivisions = 10;
    const bodySubdivisions = 10;

    const torusVertices = twgl.primitives.createTorusVertices(
      radius, thickness, radialSubdivisions, bodySubdivisions,
    );

    const deindexedVertices = twgl.primitives.deindexVertices(torusVertices);
    return deindexedVertices;
  }

  static buildRandomColoredTorus(size) {
    const uncoloredTorus = this.buildTorus(size);
    return twgl.primitives.makeRandomVertexColors(uncoloredTorus);
  }
}
