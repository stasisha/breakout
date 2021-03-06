import Text from './Text.js';

export default class Score {

  /**
   * @type {Text}
   */
  #originalObject;

  /**
   * @type {number}
   */
  #score;

  /**
   * @param text {Text}
   */
  constructor(text) {
    this.#originalObject = text;
    this.#score = 0;
  }

  /**
   * @return {string}
   */
  get text() {
    return `${ this.#originalObject.text }${ this.#score }`;
  }

  /**
   * @return {string}
   */
  get type() {
    return this.#originalObject.type;
  }

  /**
   * @return {number}
   */
  get x() {
    return this.#originalObject.x;
  }

  /**
   * @return {number}
   */
  get y() {
    return this.#originalObject.y;
  }

  /**
   * @return {string}
   */
  get fillStyle() {
    return this.#originalObject.fillStyle;
  }

  /**
   * @return {string}
   */
  get font() {
    return this.#originalObject.font;
  }


  get score() {
    return this.#score;
  }

  incrementScore() {
    this.#score++;
  }

  reset() {
    this.#score = 0;
  }
}
