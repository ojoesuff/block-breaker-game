import Paddle from "/src/paddle";
import InputHandler from "/src/input";
import Ball from "/src/ball";
import Brick from "/src/brick";
import { buildLevel, level1 } from "./levels";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
  }

  start() {
    this.gamestate = GAMESTATE.RUNNING;
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);

    let bricks = buildLevel(this, level1);

    this.gameObjects = [this.paddle, this.ball, ...bricks];

    new InputHandler(this.paddle, this);
  }

  update(deltaTime) {
    if (this.gamestate === GAMESTATE.PAUSED) {
      return;
    }
    this.gameObjects.forEach(object => object.update(deltaTime));

    this.gameObjects = this.gameObjects.filter(
      object => !object.markedForDeletion
    );
  }

  draw(ctx) {
    this.gameObjects.forEach(object => object.draw(ctx));

    if (this.gamestate === GAMESTATE.PAUSED) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fill();

      ctx.font = "30px arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
    }
  }

  togglePause() {
    if (this.gamestate === GAMESTATE.RUNNING) {
      this.gamestate = GAMESTATE.PAUSED;
    } else {
      this.gamestate = GAMESTATE.RUNNING;
    }
  }
}
