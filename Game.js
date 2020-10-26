import Scene from './Scene.js';
import Ball from './elements/Ball.js';
import Paddle from './elements/Paddle.js';
import Brick from './elements/Brick.js';
import Score from './elements/Score.js';
import Lives from './models/Lives.js';
import Level from './elements/Level.js';
import MaxScore from './models/MaxScore.js';
import MaxScoreText from './elements/MaxScoreText.js';
import Text from './elements/Text.js';
import LivesText from './elements/LivesText.js';
import Bold from './textDecorators/Bold.js';
import Italic from './textDecorators/Italic.js';

export default class Game {

  /**
   * @param renderer {CanvasRender}
   * @param config {object}
   * @param eventHandler {BrowserEventHandler}
   * @param storage {CookieStorage}
   */
  constructor(renderer, config, eventHandler, storage) {
    this.renderer = renderer;
    this.config = config;
    this.eventHandler = eventHandler;
    this.storage = storage;
    this.maxScore = new MaxScore();
    this.maxScoreStorage = storage.createMaxScoreStorage(this.maxScore);
    this.maxScoreStorage.restore();
    this.scene = new Scene();
    this.paused = true;
    this.eventHandler.addKeyDownCallback(() => {
      this.paused = false;
    });
    this.fillScene();
  }

  pause() {
    this.paused = true;
  }

  run() {
    this.handleEvents();
    this.interactObjects();
    this.render();
  }

  interactObjects() {
    const ball = this.scene.get('ball');
    const bricks = this.scene.get('bricks');
    const score = this.scene.get('score');
    const paddle = this.scene.get('paddle');
    const lives = this.scene.get('lives');

    if (this.paused === true) {
      return;
    }

    const ballBottomY = ball.y + ball.radius;
    const ballTopY = ball.y - ball.radius;
    const ballLeftX = ball.x - ball.radius;
    const ballRightX = ball.x + ball.radius;

    const gameZoneWidth = this.renderer.getWidth();
    const gameZoneHeight = this.renderer.getHeight();

    bricks.forEach((brick) => {
      if (brick.durability > 0) {
        if (
          brick.hasPoint(ball.x, ballBottomY + ball.dy)
          || brick.hasPoint(ball.x, ballTopY + ball.dy)
          || brick.hasPoint(ballLeftX + ball.dx, ball.y)
          || brick.hasPoint(ballRightX + ball.dx, ball.y)
        ) {
          ball.hitY();
          brick.decreaseDurability();
          score.incrementScore();
          if (bricks.every((b) => b.durability === 0)) {
            this.win();
          }
        }
      }
    });

    if (ball.x + ball.dx > gameZoneWidth - ball.radius || ball.x + ball.dx < ball.radius) {
      ball.hitX();
    }
    if (ball.y + ball.dy < ball.radius) {
      ball.hitY();
    } else if (
      ball.y + ball.dy > gameZoneHeight - ball.radius - paddle.height
      && (paddle.hasPoint(ball.x, ballBottomY)
          || ballRightX > paddle.x && ballLeftX < paddle.x + paddle.width
          || paddle.hasPoint(ballLeftX, ball.y)
          || paddle.hasPoint(ballRightX, ball.y)
      )) {
      ball.hitY();
    } else if (ballBottomY > gameZoneHeight - ball.radius) {
      lives.decrementLives();
      if (!lives.lives) {
        this.gameOver();
      } else {
        this.lostLive();
      }
    }

    ball.move();
  }

  win() {
    const ball = this.scene.get('ball');
    const bricks = this.scene.get('bricks');
    const level = this.scene.get('level');
    const paddle = this.scene.get('paddle');
    const score = this.scene.get('score');

    this.maxScore.addScore(score.score);
    this.maxScoreStorage.save();
    bricks.forEach((brick) => {
      brick.reset();
    });
    level.incrementLevel();
    ball.reset(level.level);
    paddle.reset();
    this.pause();
  }

  gameOver() {
    const ball = this.scene.get('ball');
    const bricks = this.scene.get('bricks');
    const score = this.scene.get('score');
    const level = this.scene.get('level');
    const paddle = this.scene.get('paddle');
    const lives = this.scene.get('lives');

    this.maxScore.addScore(score.score);
    this.maxScoreStorage.save();
    bricks.forEach((brick) => {
      brick.reset();
    });
    level.reset();
    ball.reset(level.level);
    paddle.reset();
    score.reset();
    lives.reset();

    this.pause();
  }

  lostLive() {
    const ball = this.scene.get('ball');
    const paddle = this.scene.get('paddle');
    const level = this.scene.get('level');
    ball.reset(level.level);
    paddle.reset();
    this.pause();
  }

  render() {
    this.renderer.renderScene(this.scene);
    requestAnimationFrame(() => {
      this.run();
    });
  }

  fillScene() {
    const level = new Level(1, new Text('Level: ', 30, 20, this.config.lives.fillStyle, this.config.font));
    this.scene.add('level', level);

    this.scene.add('ball', new Ball(
      this.renderer.getWidth() / 2,
      this.renderer.getHeight() - 30,
      this.config.ball.speed,
      level.level,
      this.config.ball.radius,
      this.config.ball.fillStyle
    ));
    let paddle = new Paddle(
      (this.renderer.getWidth() - this.config.paddle.width) / 2,
      this.renderer.getHeight() - this.config.paddle.height,
      this.config.paddle.width,
      this.config.paddle.height,
      this.config.paddle.fillStyle
    );
    this.scene.add('paddle', paddle);
    let bricks = Brick.getBricks(
      this.config.bricks,
      this.config.brick
    );
    this.scene.add('bricks', bricks);

    const liveLabel = new Text('Lives: ', 130, 20, this.config.lives.fillStyle, this.config.font);
    const liveLabelBold = new Bold(liveLabel);
    const liveLabelBoldItalic = new Italic(liveLabelBold);
    const lives = new LivesText(new Lives(3), liveLabelBoldItalic);

    const score = new Score(new Text('Score: ', 230, 20, this.config.score.fillStyle, this.config.font));
    this.scene.add('lives', lives);
    this.scene.add('score', score);

    this.scene.add('maxScore', new MaxScoreText(
      this.maxScore,
      new Text(
        'Max score: ',
        this.renderer.getWidth() - 130,
        20,
        this.config.score.fillStyle,
        this.config.font
      )
    ));
  }

  handleEvents() {
    const paddle = this.scene.get('paddle');
    if (this.eventHandler.isLeftPressed && paddle.x > 0) {
      paddle.moveLeft();
    }
    if (this.eventHandler.isRightPressed && paddle.x < this.renderer.getWidth() - paddle.width) {
      paddle.moveRight();
    }
  }
}
