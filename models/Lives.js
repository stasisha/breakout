export default class Lives {

  /**
   * @type {number}
   */
  #initialLives;

  /**
   * @type {number}
   */
  #lives;

  /**
   * @param lives {number}
   */
  constructor(lives) {
    this.#initialLives = lives;
    this.reset();
  }

  decrementLives() {
    this.#lives--;
  }

  reset() {
    this.#lives = this.#initialLives;
  }

  get lives() {
    return this.#lives;
  }
}
