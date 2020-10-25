import Canvas from './Canvas.js';
import CanvasRender from './CanvasRender.js';
import BrowserEventHandler from './BrowserEventHandler.js';
import Game from './Game.js';
import config from './config.js';
import CookieStorage from './CookieStorage.js';

const canvas = new Canvas(document.getElementById("gameCanvas"));
const renderer = new CanvasRender(canvas);
const eventHandler = new BrowserEventHandler();
const storage = new CookieStorage();
const game = new Game(renderer, config, eventHandler, storage);
game.run();
