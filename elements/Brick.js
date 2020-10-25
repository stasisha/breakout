import Rectangle from './Rectangle.js';

export default class Brick extends Rectangle {
  constructor(x, y, width, height, durability, durabilityConfig) {
    super(x, y, width, height);
    this.width = width;
    this.height = height;
    this.durabilityConfig = durabilityConfig;
    this.initialDurability = durability;
    this.reset();
  }

  set fillStyle(fillStyle) {};

  get fillStyle() {
    if (this.durability === 0) {
      return 'transparent';
    }
    return this.durabilityConfig[this.durability - 1].fillStyle;
  }

  decreaseDurability() {
    this.durability--;
  }

  reset() {
    this.durability = this.initialDurability;
  }

  static getBricks(
    bricksConfig,
    brickConfig
  ) {
    let bricks = [];
    for (let r = 0; r < bricksConfig.rowCount; r++) {
      for (let c = 0; c < bricksConfig.columnCount; c++) {
        let brickX = (c * (brickConfig.width + bricksConfig.padding)) + bricksConfig.offsetLeft;
        let brickY = (r * (brickConfig.height + bricksConfig.padding)) + bricksConfig.offsetTop;
        bricks.push(new Brick(brickX, brickY, brickConfig.width, brickConfig.height, r + 1, brickConfig.durability));
      }
    }
    return bricks;
  }
}
