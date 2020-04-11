import { bind } from "./utill";

class Canvas {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  width: number;
  height: number;

  x: number;
  y: number;

  constructor() {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;

    const ctx = this.canvas.getContext('2d');
    if (!ctx) throw new Error('Cant get Context');

    this.ctx = ctx;
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.x = 0;
    this.y = 0;
  };

  init() {
    this.show(true);
    this.draw();
    this.catchEvent();
  }

  show(isDisplay: boolean) {
    document.getElementById('game')!.style.display = isDisplay ? 'block' : 'none';
  }

  draw() {
    if (!window.db.room || !window.db.user) return;
    this.ctx.clearRect(0, 0, this.width, this.height);

    const scaleX = this.width / 15;
    const scaleY = this.height / 15;

    for (let i = 0; i < scaleX; i++) {
      for (let j = 0; j < scaleY; j++) {
        this.ctx.beginPath();

        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = 'black';

        this.ctx.strokeRect(j * scaleX, i * scaleY, scaleX, scaleY);
        this.ctx.closePath();
      }
    }

    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 15; j++) {
        if (window.db.room.map[i][j] === 0) continue;
        this.ctx.beginPath();

        this.ctx.fillStyle = window.db.room.map[i][j] === 1 ? 'black' : 'white';
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = 'black';
  
        this.ctx.arc(j * scaleX, i * scaleY, scaleX / 3, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
      }
    }

    for (let i = 0; i < 4; i++) this.ctx.strokeRect(1, 1, this.width - 2, this.height - 2); // 테두리 부분을 진하게 하기 위함

    if (window.db.room[window.db.room.turn].id === window.db.user.id) { // 자기 턴 일 때
      this.ctx.beginPath();

      this.ctx.fillStyle = window.db.room.turn === 'player1' ? 'rgba(0, 0, 0, .8)' : 'rgba(255, 255, 255, .8)';
      this.ctx.lineWidth = 3;
      this.ctx.strokeStyle = 'black';

      this.ctx.arc(this.y * scaleX, this.x * scaleY, scaleX / 3, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }

  catchEvent() {
    const scaleX = this.width / 15;
    const scaleY = this.height / 15;

    this.canvas.addEventListener('mousemove', e => {
      const mouseX = e.clientX - this.canvas.offsetLeft;
      const mouseY = e.clientY - this.canvas.offsetTop;

      this.y = Math.abs(Math.round(mouseX / scaleX)); // 배열은 x,y가 다르기 때문에 x 좌표를 y에 대입
      this.x = Math.abs(Math.round(mouseY / scaleY));
      
      console.log(this.x, this.y);

      this.draw();
    }, false);

    this.canvas.addEventListener('click', () => {
      if (!window.db.room || !window.db.user) return;
      if (window.db.room.map[this.x][this.y] !== 0) return; // 이미 값이 있을 때
      if (window.db.room[window.db.room.turn].id !== window.db.user.id) return; // 자기 턴이 아닐 떄
      
      console.log(this.x, this.y)

      window.ws.send(bind('click', {
        x: this.x,
        y: this.y,
      }));
    });
  }
};

export default Canvas;