import MaxScoreStorage from './MaxScoreStorage.js';

export default class CookieStorage {

  /**
   * @param maxScore {MaxScore}
   * @return {MaxScoreStorage}
   */
  createMaxScoreStorage(maxScore) {
    return new MaxScoreStorage(maxScore);
  }

}
