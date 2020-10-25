export default class Text {
  constructor(text, x, y, fillStyle, font) {
    this.type = 'text';
    this.text = text;
    this.x = x;
    this.y = y;
    this.fillStyle = fillStyle;
    this.font = font;
  }
}
