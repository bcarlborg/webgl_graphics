'use strict';

import keyNames from './helpers/keyNames.js';

export default class KeyHandler {
  constructor() {
    if (KeyHandler.instance) return KeyHandler.instance;
    KeyHandler.instance = this;

    this.keysPressedForNextUpdate = {};

    this.registerEventHandlers();
    this.keysPressed = {};
    this.keyCallbacks = {};
    return this;
  }

  registerEventHandlers() {
    document.onkeydown = (event) => {
      const keyName = keyNames[event.keyCode];
      this.keysPressedForNextUpdate[keyName] = true;
    };

    document.onkeyup = (event) => {
      this.keysPressedForNextUpdate[keyNames[event.keyCode]] = false;
    };
  }

  update() {
    Object.assign(this.keysPressed, this.keysPressedForNextUpdate);
  }
}
