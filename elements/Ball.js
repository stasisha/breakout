export default class Ball {
  constructor(x, y, speed, level, radius, fillStyle) {
    this.type = 'arc';
    this.initialX = x;
    this.initialY = y;
    this.radius = radius;
    this.fillStyle = fillStyle;
    this.speed = speed;
    this.reset(level);
  }

  hitY() {
    this.dy = -this.dy;
  }

  hitX() {
    this.dx = -this.dx;
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }

  reset(level) {
    this.x = this.initialX;
    this.y = this.initialY;
    this.dx = this.speed * level;
    this.dy = -(this.speed * level);
  }
}
