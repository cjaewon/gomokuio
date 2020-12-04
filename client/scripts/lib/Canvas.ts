import { event, gomokuColor } from '../event';
import data from '../data';
import { wsSend } from '../lib';
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

    this.y = 0;
    this.x = 0;
  }

  init() {
    this.display(true);
    this.draw();
    this.catchEvent();
  }

  uninit() {
    this.display(false);
    data.room = null;
    data.user = null;
  }

  display(bool: boolean = true) {
    const gameElement = document.getElementById('game');
    gameElement.style.display = bool ? 'flex' : 'none';
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

    const { room, user } = data;

    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 15; j++) {
        if (room.map[i][j] === 0) continue;

        this.ctx.beginPath();

        this.ctx.fillStyle = room.map[i][j] === gomokuColor.black ? 'black' : 'white';
        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = '#CBD5E0';
  
        this.ctx.arc(j * scaleX, i * scaleY, scaleX / 2.25, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
      }
    }

    if (room.turn.id !== user.id) return;

    this.ctx.beginPath();

    this.ctx.fillStyle = room.user1.id === user.id ? 'black' : 'white'; 

    if (data.room.map[this.y][this.x] !== 0) 
      this.ctx.fillStyle = room.user1.id === user.id ? 'rgba(0, 0, 0, .8)' : 'rgba(255, 255, 255, .8)'; 
    

    this.ctx.lineWidth = 4;
    this.ctx.strokeStyle = '#CBD5E0';

    this.ctx.arc(this.x * scaleX, this.y * scaleY, scaleX / 2.25, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();
  }

  catchEvent() {
    const scaleX = this.width / 15;
    const scaleY = this.height / 15;

    this.canvas.addEventListener('mousemove', e => {
      const { room, user } = data;
      if (room.turn.id !== user.id) return;

      const mouseX = e.clientX - this.canvas.offsetLeft;
      const mouseY = e.clientY - this.canvas.offsetTop;

      this.x = Math.abs(Math.round(mouseX / scaleX));
      this.y = Math.abs(Math.round(mouseY / scaleY));

      this.draw();
    }, false);

    this.canvas.addEventListener('click', () => {
      const { room, user } = data;

      if (room.turn.id !== user.id) return;
      if (data.room.map[this.y][this.x] !== 0) return;
      
      wsSend(event.click, {
        x: this.x,
        y: this.y,
      });
    });
  }

}