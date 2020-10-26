import Text from './Text.js';

export default class Level {

  /**
   * @param level {number}
   * @param text {Text}
   */
  constructor(level, text) {
    this.originalObject = text;
    this.level = level;
  }

  get text() {
    return `${ this.originalObject.text }${ this.level }`;
  }

  get type() {
    return this.originalObject.type;
  }

  get x() {
    return this.originalObject.x;
  }

  get y() {
    return this.originalObject.y;
  }

  get fillStyle() {
    return this.originalObject.fillStyle;
  }

  get font() {
    return this.originalObject.font;
  }

  incrementLevel() {
    this.level++;
  }

  reset() {
    this.level = 1;
  }
}
