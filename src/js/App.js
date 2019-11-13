import Scene from './Scene.js';

export default class App {
  constructor(canvas, overlay) {
    this.canvas = canvas;
    this.overlay = overlay;
    this.gl = canvas.getContext('webgl2', { alpha: false });

    if (this.gl === null) {
      throw new Error('Browser does not support WebGL2');
    }

    // const blueish = [0.36036185288255385, 0.5779662266214443, 0.7534269165876528, 0];
    const palePurple = [0.564959718936457, 0.5279194427974914, 0.7639249358691695, 0];
    this.backgroundColor = [];
    this.backgroundColor.push(Math.random());
    this.backgroundColor.push(Math.random());
    this.backgroundColor.push(Math.random());
    this.backgroundColor = palePurple;
    this.backgroundColor.push(0);

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
    this.gl.clearColor(...this.backgroundColor);
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
