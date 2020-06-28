import { getTheme } from '../lib/theme';

export default class Canvas {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  y:number;
  x: number;

  constructor() {
    this.canvas = document.getElementsByTagName('canvas')[0];
    this.ctx = this.canvas.getContext('2d');

    this.canvas.width = 720;
    this.canvas.height = 720;

    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }

  init() {
    this.display(true);
    this.draw();
    this.catchEvent();
  }

  display(bool: boolean = true) {
    this.canvas.style.display = bool ? 'block' : 'none';
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    const scaleY = this.height / 15;
    const scaleX = this.width / 15;

    for (let i = 0; i < scaleX; i++) {
      for (let j = 0; j < scaleY; j++) {
        this.ctx.beginPath();

        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = getTheme() === 'light' ? '#4A5568' : 'white';

        this.ctx.strokeRect(j * scaleX, i * scaleY, scaleX, scaleY);
        this.ctx.closePath();
      }
    }

    for (let i = 0; i < 4; i++) this.ctx.strokeRect(1, 1, this.width - 2, this.height - 2); // 테두리 부분을 진하게 하기 위함

      this.ctx.beginPath();

      this.ctx.fillStyle = 'white';
      this.ctx.lineWidth = 5;
      this.ctx.strokeStyle = 'black';

      this.ctx.arc(this.x * scaleX, this.y * scaleY, scaleX / 2.25, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.closePath();
  }

  catchEvent() {
    const scaleX = this.width / 15;
    const scaleY = this.height / 15;

    this.canvas.addEventListener('mousemove', e => {
      const mouseX = e.clientX - this.canvas.offsetLeft;
      const mouseY = e.clientY - this.canvas.offsetTop;

      console.log(mouseX, mouseY);

      this.x = Math.abs(Math.round(mouseX / scaleX)); // 배열은 x,y가 다르기 때문에 x 좌표를 y에 대입
      this.y = Math.abs(Math.round(mouseY / scaleY));
      
      console.log(this.x, this.y);

      this.draw();
    }, false);
  }

}