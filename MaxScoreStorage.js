import Memento from './Memento.js';

export default class MaxScoreStorage {

  /**
   * @type {MaxScore}
   */
  #maxScore;

  /**
   * @type {string}
   */
  #cookieName = 'maxScore';


  /**
   * @param maxScore {MaxScore}
   */
  constructor(maxScore) {
    this.#maxScore = maxScore;
  }

  save() {
    const memento = this.#maxScore.save();
    const score = memento.state;
    debugger;
    this.#setCookie(score);
  }

  restore() {
    const memento = new Memento(this.#getCookie());
    this.#maxScore.restore(memento);
  }

  /**
   * @param val {string}
   */
  #setCookie(val) {
    const name = this.#cookieName;
    const days = 365;
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + val + ";" + expires + ";path=/";
  }

  /**
   * @return {string}
   */
  #getCookie() {
    const name = this.#cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }


}
