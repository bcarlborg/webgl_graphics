import glMatrix from './helpers/glm.js';
import _ from './helpers/lodash.js';

export default class ClickListener {
  constructor(canvas) {
    if (ClickListener.instance) {
      return ClickListener.instance;
    }
    ClickListener.instance = this;
    this.canvas = canvas;
    this.info = {};
    this.internalInfo = {};
    this.clickInfo = this.externalInfo; // what others read
    this.initClickObjects();
    this.initListeners();
  }

  initClickObjects() {
    this.maxClickDistance = 0.01;
    this.info = {
      click: {
        is: false,
        loc: glMatrix.vec2.create(),
      },
      drag: {
        is: false,
        initial: glMatrix.vec2.create(),
        curr: glMatrix.vec2.create(),
        diff: glMatrix.vec2.create(),
      },
    };
    this.infoForNextUpdate = _.cloneDeep(this.info);

    this.internalInfo = {
      mouseDown: {
        is: false, loc: glMatrix.vec2.create(),
      },
      mouseUp: {
        is: false,
        loc: glMatrix.vec2.create(),
      },
      mouseDownMove: {
        is: false,
        loc: glMatrix.vec2.create(),
        fromDown: glMatrix.vec2.create(),
        distance: 0,
      },
    };
  }

  processMouseDown(x, y) {
    const { mouseDown, mouseDownMove, mouseUp } = this.internalInfo;
    mouseDown.is = true;
    mouseDownMove.is = true;
    mouseUp.is = false;

    glMatrix.vec2.set(mouseDown.loc, x, y);
    glMatrix.vec2.set(mouseDownMove.loc, x, y);
  }

  processMouseMove(x, y) {
    const { mouseDown, mouseDownMove } = this.internalInfo;
    if (mouseDown.is) {
      glMatrix.vec2.set(mouseDownMove.loc, x, y);
      glMatrix.vec2.subtract(
        mouseDownMove.fromDown,
        mouseDownMove.loc,
        mouseDown.loc,
      );

      mouseDownMove.distance = glMatrix.vec2.len(mouseDownMove.fromDown);
      if (mouseDownMove.distance > this.maxClickDistance) {
        const { drag } = this.infoForNextUpdate;
        drag.is = true;
        glMatrix.vec2.set(
          drag.initial,
          mouseDown.loc[0],
          mouseDown.loc[1],
        );
        glMatrix.vec2.set(drag.curr, x, y);
        glMatrix.vec2.subtract(
          drag.diff,
          drag.curr,
          drag.initial,
        );
      }
    }
  }

  processMouseUp(x, y) {
    const { mouseDown, mouseDownMove, mouseUp } = this.internalInfo;
    mouseUp.is = true;
    mouseDown.is = false;
    mouseDownMove.is = false;

    glMatrix.vec2.set(mouseUp.loc, x, y);

    if (mouseDownMove.distance <= this.maxClickDistance) {
      this.infoForNextUpdate.click.is = true;
      glMatrix.vec2.set(
        this.infoForNextUpdate.click.loc,
        mouseDown.loc[0],
        mouseDown.loc[1],
      );
    }
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

    window.addEventListener('mousemove', (e) => {
      const normalX = adjustX(e);
      const normalY = adjustY(e);
      this.processMouseMove(normalX, normalY);
    });
  }

  update() {
    const { info, infoForNextUpdate } = this;
    info.click.is = infoForNextUpdate.click.is;
    glMatrix.vec2.copy(info.click.loc, infoForNextUpdate.click.loc);

    info.drag.is = infoForNextUpdate.drag.is;
    glMatrix.vec2.copy(info.drag.initial, infoForNextUpdate.drag.initial);
    glMatrix.vec2.copy(info.drag.curr, infoForNextUpdate.drag.curr);
    glMatrix.vec2.copy(info.drag.diff, infoForNextUpdate.drag.diff);

    this.resetInfoForNextUpdate();
  }

  resetInfoForNextUpdate() {
    this.infoForNextUpdate.click.is = false;
    if (!this.internalInfo.mouseDown.is) {
      this.infoForNextUpdate.drag.is = false;
    }
  }
}
