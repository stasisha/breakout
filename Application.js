import Game from './Game.js';
import config from './config.js';
import BrowserServiceProvider from './BrowserServiceProvider.js';

export default class Application {

  static run() {
    const serviceProvider = new BrowserServiceProvider("gameCanvas");
    const renderer = serviceProvider.getRenderer();
    const eventHandler = serviceProvider.getEventHandler();
    const storage = serviceProvider.getStorage();
    const game = new Game(renderer, config, eventHandler, storage);

    game.run();
  }

}
