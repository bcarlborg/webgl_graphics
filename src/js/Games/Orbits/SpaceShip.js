import GameNode from '../../GameNode.js';

export default class SpaceShip extends GameNode {
  constructor(gl, mesh) {
    super(gl, mesh);
    this.foo = 'bar';
  }
}
