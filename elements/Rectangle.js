export default class Rectangle {
  constructor(x, y, width, height, fillStyle) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.fillStyle = fillStyle;
    this.type = 'rectangle';
  }

  hasPoint(x, y) {
    return x > this.x
           && x < this.x + this.width
           && y > this.y
           && y < this.y + this.height;
  }
}
