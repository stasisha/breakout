export default class CanvasRender {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext();
  }

  getWidth() {
    return this.canvas.element.width;
  }

  getHeight() {
    return this.canvas.element.height;
  }

  renderScene(scene) {
    this.ctx.clearRect(0, 0, this.getWidth(), this.getHeight());
    for (const [, obj] of Object.entries(scene.objects)) {
      if (Array.isArray(obj)) {
        this.renderArrayOfObjects(obj);
      } else {
        this.renderObject(obj);
      }
    }
  }

  renderArrayOfObjects(array) {
    array.forEach((obj) => {
      this.renderObject(obj);
    });
  }

  renderObject(obj) {
    switch (obj.type) {
      case 'arc':
        this.renderArc(obj);
        break;
      case 'rectangle':
        this.renderRectangle(obj);
        break;
      case 'text':
        this.renderText(obj);
        break;
      default:
        debugger;
        throw new Error('Not supported object type. Impossible to render.');
    }
  }

  renderArc(arc) {
    let ctx = this.ctx;
    ctx.beginPath();
    ctx.arc(arc.x, arc.y, arc.radius, 0, Math.PI * 2);
    ctx.fillStyle = arc.fillStyle;
    ctx.fill();
    ctx.closePath();
  }

  renderText(text) {
    let ctx = this.ctx;
    ctx.font = text.font;
    ctx.fillStyle = text.fillStyle;
    ctx.fillText(text.text, text.x, text.y);
  }

  renderRectangle(rectangle) {
    let ctx = this.ctx;
    ctx.beginPath();
    ctx.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
    ctx.fillStyle = rectangle.fillStyle;
    ctx.fill();
    ctx.closePath();
  }
}
