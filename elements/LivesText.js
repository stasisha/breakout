import Text from './Text.js';

export default class LivesText {

  /**
   * @type {Text}
   */
  #originalObject;

  /**
   * @type {Lives}
   */
  #lives;

  /**
   * @param lives {Lives}
   * @param text {Text}
   */
  constructor(lives, text) {
    this.#originalObject = text;
    this.#lives = lives;
  }

  /**
   * @return {string}
   */
  get text() {
    return `${ this.#originalObject.text }${ this.#lives.lives }`;
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

  decrementLives() {
    this.#lives.decrementLives();
  }

  reset() {
    this.#lives.reset();
  }

  get lives() {
    return this.#lives.lives;
  }
}
