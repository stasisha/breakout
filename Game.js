import Scene from './Scene.js';
import Ball from './elements/Ball.js';
import Paddle from './elements/Paddle.js';
import Brick from './elements/Brick.js';
import Score from './elements/Score.js';
import Lives from './elements/Lives.js';
import Level from './elements/Level.js';
import Result from './elements/Result.js';

export default class Game {

  constructor(renderer, config, eventHandler, storage) {
    this.renderer = renderer;
    this.config = config;
    this.eventHandler = eventHandler;
    this.storage = storage;
    this.paddleX = (renderer.getWidth() - this.config.paddle.width) / 2;
    this.scene = new Scene();
    this.paused = true;
    this.eventHandler.addKeyDownCallback(() => {this.paused = false;});
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
    bricks.forEach((brick) => {brick.reset();});
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
    const results = this.scene.get('results');

    bricks.forEach((brick) => {brick.reset();});
    level.reset();
    ball.reset(level.level);
    paddle.reset();
    score.reset();
    lives.reset();
    results.maxScore = this.storage.getResults();
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
    requestAnimationFrame(() => {this.run();});
  }

  fillScene() {
    const level = new Level(1, 30, 20, this.config.lives.fillStyle, this.config.font);
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
      this.paddleX,
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
    this.scene.add('lives', new Lives(3, 130, 20, this.config.lives.fillStyle, this.config.font));
    this.scene.add('score', new Score(230, 20, this.config.score.fillStyle, this.config.font));
    this.scene.add('results', new Result(
      this.storage.getResults(),
      this.renderer.getWidth() - 130,
      20,
      this.config.score.fillStyle,
      this.config.font
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
