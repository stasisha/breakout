import Text from './Text.js';

export default class Result extends Text {
  constructor(results, x, y, fillStyle, font) {
    const maxScore = Result.getMaxResult(results);
    super(Result.getResultText(maxScore), x, y, fillStyle, font);
  }

  static getResultText(maxScore) {
    return "Max score: " + maxScore;
  }

  static getMaxResult(results) {
    return results ? Math.max(...results) : 0;
  }

  set maxScore(results) {
    const maxScore = Result.getMaxResult(results);
    this.text = Result.getResultText(maxScore);
  }

  get maxScore() {
    return this.text;
  }

}
