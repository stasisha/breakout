import Rectangle from './Rectangle.js';

export default class Paddle extends Rectangle {
  constructor(x, y, width, height, fillStyle) {
    super(x, y, width, height, fillStyle);
    this.initialX = x;
    this.initialY = y;
    this.reset();
  }

  moveSpeed = 15;

  moveLeft() {
    this.x -= this.moveSpeed;
  }

  moveRight() {
    this.x += this.moveSpeed;
  }

  reset() {
    this.x = this.initialX;
    this.y = this.initialY;
  }
}
