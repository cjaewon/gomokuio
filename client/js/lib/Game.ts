import Canvas from "./Canvas";

class Game {
  canvas: Canvas;

  constructor() {
    this.canvas = new Canvas();
  };

  start() {
    this.canvas.init();
  }
};

export default Game;