'use strict';

import keyNames from './helpers/keyNames.js';

export default class KeyHandler {
  constructor() {
    if (KeyHandler.instance) return KeyHandler.instance;
    KeyHandler.instance = this;

    this.registerEventHandlers();
    this.keysPressed = {};
    this.keyCallbacks = {};
    return this;
  }

  registerCallback(keyName, callback) {
    if (!this.keyCallbacks[keyName]) {
      this.keyCallbacks[keyName] = [];
    }
    this.keyCallbacks[keyName].push(callback);
  }

  executeCallbacks(keyName) {
    if (this.keyCallbacks[keyName]) {
      this.keyCallbacks[keyName].forEach((callback) => { callback(); });
    }
  }

  registerEventHandlers() {
    document.onkeydown = (event) => {
      const keyName = keyNames[event.keyCode];
      if (!this.keysPressed[keyName]) {
        this.executeCallbacks(keyName);
      }
      this.keysPressed[keyName] = true;
    };

    document.onkeyup = (event) => {
      this.keysPressed[keyNames[event.keyCode]] = false;
    };
  }
}
