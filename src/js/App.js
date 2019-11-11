import Scene from './Scene.js';

export default class App {
  constructor(canvas, overlay) {
    this.canvas = canvas;
    this.overlay = overlay;
    this.gl = canvas.getContext('webgl2', { alpha: false });

    if (this.gl === null) {
      throw new Error('Browser does not support WebGL2');
    }

    this.gl.pendingResources = {};
    this.scene = new Scene(this.gl, this.canvas);
    this.resize();
  }

  resize() {
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;
    this.gl.viewport(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
  }

  clearBackground() {
    this.gl.clearColor(0.1, 0.14, 0.1, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
  }

  registerEventHandlers() {
    window.addEventListener('resize', () => this.resize());
    window.requestAnimationFrame(() => this.update());
  }

  update() {
    this.clearBackground();
    this.scene.update();
    this.scene.draw();
    window.requestAnimationFrame(() => this.update());
  }
}

// entry point from HTML
window.addEventListener('load', () => {
  const canvas = document.getElementById('canvas');
  const overlay = document.getElementById('overlay');

  const app = new App(canvas, overlay);
  app.registerEventHandlers();
});
