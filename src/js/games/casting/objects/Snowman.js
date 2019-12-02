import ClippedQuadric from '../../../ClippedQuadric.js';

export default class Snowman extends ClippedQuadric {
  constructor(index) {
    super(index);
    this.setToUnitCylinder();
  }
}
