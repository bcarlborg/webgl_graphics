export default class Game {
  constructor() {
    this.gameObjects = [];
    this.camera = null;
  }

  cameraInUse() {
    return this.camera;
  }

  objectsToUpdate() {
    return this.gameObjects;
  }

  objectsToDraw() {
    return this.gameObjects;
  }
}
