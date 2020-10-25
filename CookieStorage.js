export default class CookieStorage {

  cookieName = 'results';

  /**
   * @param result {number}
   */
  addResult(result) {
    let results = this.getResults();
    if (!results) {
      results = [];
    }
    results.push(result);
    this.#setCookie(JSON.stringify(results));
  };

  getResults() {
    const cookie = this.#getCookie();
    if (!cookie) {
      return null;
    }
    return JSON.parse(this.#getCookie());
  }

  /**
   * @param val {string}
   */
  #setCookie(val) {
    const name = this.cookieName;
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
    const name = this.cookieName + "=";
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
