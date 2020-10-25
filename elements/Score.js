import Text from './Text.js';

export default class Score extends Text {
  constructor(x, y, fillStyle, font) {
    super(Score.getScoreText(0), x, y, fillStyle, font);
    this.score = 0;
  }

  static getScoreText(score) {
    return "Score:  " + score;
  }

  incrementScore() {
    this.score++;
    this.text = Score.getScoreText(this.score);
  }

  reset() {
    this.score = 0;
    this.text = Score.getScoreText(this.score);
  }
}
