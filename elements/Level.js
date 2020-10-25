import Text from './Text.js';

export default class Level extends Text {
  constructor(level, x, y, fillStyle, font) {
    super(Level.getLevelText(level), x, y, fillStyle, font);
    this.level = level;
  }

  static getLevelText(level) {
    return "Level: " + level;
  }

  incrementLevel() {
    this.level++;
    this.text = Level.getLevelText(this.level);
  }

  reset() {
    this.level = 1;
    this.text = Level.getLevelText(this.level);
  }
}
