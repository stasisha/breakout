export default class BrowserEventHandler {

  constructor() {
    document.addEventListener("keydown", (e) => {this.keyDownHandler(e);}, false);
    document.addEventListener("keyup", (e) => {this.keyUpHandler(e);}, false);

    this.isRightPressed = false;
    this.isLeftPressed = false;

    this.keyDownnEvents = [];
  }

  addKeyDownCallback(event) {
    this.keyDownnEvents.push(event);
  }

  keyDownHandler(e) {

    this.keyDownnEvents.forEach((event) => event());

    if (e.key === "Right" || e.key === "ArrowRight") {
      this.isRightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      this.isLeftPressed = true;
    }
  }

  keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
      this.isRightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      this.isLeftPressed = false;
    }
  }
}
