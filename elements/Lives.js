import Text from './Text.js';

export default class Lives extends Text {
  constructor(lives, x, y, fillStyle, font) {
    super(lives, x, y, fillStyle, font);
    this.initialLives = lives;
    this.reset();
  }


  decrementLives() {
    this.lives--;
  }

  reset() {
    this.lives = this.initialLives;
  }
}
