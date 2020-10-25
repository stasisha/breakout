import Text from './Text.js';

export default class Lives extends Text {
  constructor(lives, x, y, fillStyle, font) {
    super(Lives.getLivesText(lives), x, y, fillStyle, font);
    this.initialLives = lives;
    this.reset();
  }

  static getLivesText(lives) {
    return "Lives: " + lives;
  }

  decrementLives() {
    this.lives--;
    this.text = Lives.getLivesText(this.lives);
  }

  reset(){
    this.lives = this.initialLives;
    this.text = Lives.getLivesText(this.lives);
  }
}
