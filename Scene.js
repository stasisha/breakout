export default class Scene {

  objects = {};

  clear() {
    this.objects = {};
  }

  add(key, object) {
    this.objects[key] = object;
  }

  get(key) {
    return this.objects[key];
  }

}
