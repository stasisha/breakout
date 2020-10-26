import Text from '../elements/Text.js';

export default class Bold {

  /**
   * @type {Text}
   */
  #originalObject;

  /**
   * @param text {Text}
   */
  constructor(text) {
    this.#originalObject = text;
  }

  /**
   * @return {string}
   */
  get font() {
    return `bold ${ this.#originalObject.font }`;
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
  get text() {
    return this.#originalObject.text;
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
}
