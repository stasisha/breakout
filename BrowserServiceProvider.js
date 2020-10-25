import Canvas from './Canvas.js';
import CanvasRender from './CanvasRender.js';
import BrowserEventHandler from './BrowserEventHandler.js';
import CookieStorage from './CookieStorage.js';

export default class BrowserServiceProvider {

  constructor(canvasId) {
    this.canvas = new Canvas(document.getElementById(canvasId));
  }

  getRenderer() {
    return new CanvasRender(this.canvas);
  }

  getEventHandler() {
    return new BrowserEventHandler();
  }

  getStorage() {
    return new CookieStorage();
  }
}
