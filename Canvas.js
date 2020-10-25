export default class Canvas {
  constructor(element, contextType = "2d") {
    this.element = element;
    this.contextType = contextType;
    this.context = this.element.getContext(this.contextType);
  }

  getContext() {
    return this.context;
  }
}
