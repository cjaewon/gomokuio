class Canvas {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  width: number;
  height: number;

  constructor() {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;

    const ctx = this.canvas.getContext('2d');
    if (!ctx) throw new Error('Cant get Context');

    this.ctx = ctx
    this.width = this.canvas.width;
    this.height = this.canvas.height;
  };

  drawMap() {
    const n = this.width / 15;
    const m = this.height / 15;

    console.log(this.width, this.height, n, m);

    for(let i = 0; i < n; i++) {
      this.ctx.beginPath();
      this.ctx.fillStyle = 'black';
      this.ctx.fillRect(n * i, 0, 3, this.height);
      this.ctx.closePath();
    }
    
    for (let i = 0; i < m; i++) {
      console.log(123)
      this.ctx.beginPath();
      this.ctx.fillStyle = 'black';
      this.ctx.fillRect(0, n * i, this.width, 3);
      this.ctx.closePath();
    }

    console.log(this.width, this.height, n, m);
  }

};

export default Canvas;