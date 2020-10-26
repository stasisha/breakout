import Text from './Text.js';

export default class MaxScoreText {
  /**
   * @type {Text}
   */
  #originalObject;

  /**
   * @type {MaxScore}
   */
  #maxScore;

  /**
   * @param maxScore {MaxScore}
   * @param text {Text}
   */
  constructor(maxScore, text) {
    this.#originalObject = text;
    this.#maxScore = maxScore;
  }

  /**
   * @return {string}
   */
  get text() {
    return `${ this.#originalObject.text }${ this.#maxScore.maxScore }`;
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

  /**
   * @param maxScore {number}
   */
  set maxScore(maxScore) {
    this.#maxScore.maxScore = maxScore;
  }

  /**
   * @return {number}
   */
  get maxScore() {
    return this.#maxScore.maxScore;
  }

  /**
   * @return {Memento}
   */
  save() {
    return this.#maxScore.save();
  }

  /**
   * @param memento {Memento}
   */
  restore(memento) {
    this.maxScore.restore(memento);
  }
}
