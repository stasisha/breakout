export default class Memento {
  #state;

  #date;

  constructor(state) {
    this.#state = state;
    this.#date = new Date();
  }

  get state() {
    return this.#state;
  }

  get date() {
    return this.#date;
  }

  get dateName() {
    return 'Snapshot_' + this.date;
  }
}
