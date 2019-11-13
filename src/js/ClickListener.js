import glMatrix from './helpers/glm.js';

export default class ClickListener {
  constructor(canvas) {
    if (ClickListener.instance) {
      return ClickListener.instance;
    }
    ClickListener.instance = this;
    this.canvas = canvas;
    this.externalInfo = {};
    this.internalInfo = {};
    this.clickInfo = this.externalInfo; // what others read
    this.initClickObjects();
    this.initListeners();
  }

  initClickObjects() {
    this.externalInfo = {
      isClick: false,
      clickLoc: null, // 2d vec describing the location
      isDrag: false,
      dragDiff: null, // 2d vec describing the diff
    };

    this.internalInfo = {
      mouseDown: {
        is: false, loc: glMatrix.vec2.create(),
      },
      mouseUp: {
        is: false, loc: glMatrix.vec2.create(),
      },
      currLoc: glMatrix.vec2.create(),
    };
  }

  processMouseDown(x, y) {
    const { mouseDown, mouseUp } = this.internalInfo;
    mouseDown.is = true;
    mouseUp.is = false;
    glMatrix.vec2.set(mouseDown.loc, x, y);
    console.log(mouseDown);
  }

  processMouseUp(x, y) {
    const { mouseDown, mouseUp } = this.internalInfo;
    mouseUp.is = true;
    mouseDown.is = false;
    glMatrix.vec2.set(mouseUp.loc, x, y);
    console.log(mouseUp);
  }

  initListeners() {
    const adjustX = (e) => (e.clientX / this.canvas.width) * 2 - 1;
    const adjustY = (e) => -1 * ((e.clientY / this.canvas.height) * 2 - 1);

    window.addEventListener('mousedown', (e) => {
      const normalX = adjustX(e);
      const normalY = adjustY(e);
      this.processMouseDown(normalX, normalY);
    });

    window.addEventListener('mouseup', (e) => {
      const normalX = adjustX(e);
      const normalY = adjustY(e);
      this.processMouseUp(normalX, normalY);
    });
  }

  update() {

  }
}
