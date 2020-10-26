export default class Text {

  /**
   * @type {string}
   */
  #type;

  /**
   * @type {string}
   */
  #text;

  /**
   * @type {number}
   */
  #x;

  /**
   * @type {number}
   */
  #y;

  /**
   * @type {string}
   */
  #fillStyle;

  /**
   * @type {string}
   */
  #font;

  /**
   * @param text {string}
   * @param x {number}
   * @param y {number}
   * @param fillStyle {string}
   * @param font {string}
   */
  constructor(text, x, y, fillStyle, font) {
    this.#type = 'text';
    this.#text = text;
    this.#x = x;
    this.#y = y;
    this.#fillStyle = fillStyle;
    this.#font = font;
  }

  /**
   * @return {string}
   */
  get type() {
    return this.#type;
  }

  /**
   * @return {string}
   */
  get text() {
    return this.#text;
  }

  /**
   * @return {number}
   */
  get x() {
    return this.#x;
  }

  /**
   * @return {number}
   */
  get y() {
    return this.#y;
  }

  /**
   * @return {string}
   */
  get fillStyle() {
    return this.#fillStyle;
  }

  /**
   * @return {string}
   */
  get font() {
    return this.#font;
  }
}
