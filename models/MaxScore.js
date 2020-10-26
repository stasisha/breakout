import Memento from '../Memento.js';

export default class MaxScore {

  /**
   * @type {number}
   */
  #maxScore = 0;

  /**
   * @return {number}
   */
  get maxScore() {
    return this.#maxScore;
  }

  /**
   * @param score {number}
   */
  addScore(score) {
    if (score > this.#maxScore) {
      this.#maxScore = score;
    }
  }


  set maxScore(value) {
    this.#maxScore = value;
  }

  /**
   * @return {Memento}
   */
  save() {
    return new Memento(this.#maxScore);
  }

  /**
   * @param memento {Memento}
   */
  restore(memento) {
    if (memento.state) {
      this.#maxScore = memento.state;
    }
  }
}
