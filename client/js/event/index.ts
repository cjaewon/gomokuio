import Room from "../entity/Room";
import User from "../entity/User";
import Canvas from "../lib/Canvas";

const canvas = new Canvas();

export default function event(ws: WebSocket, socketData: any) {
  const response = JSON.parse(socketData);

  const name = response.name;
  const data = response.data;

  switch (name) {
    case 'user_data': {
      window.db.user = new User(data.user.id, data.user.username);
      break;
    }
    case 'game_start': {
      window.db.room = new Room(data.room.id, data.room.player1, data.room.player2);

      document.getElementById('start-menu')!.style.display = 'none';
      document.getElementById('loader')!.style.display = 'none';
      
      canvas.init();
      break;
    }
    case 'click': {
      if (!window.db.room) return;

      window.db.room.map[data.x][data.y] = data.color;
      window.db.room.turn = data.turn;
      
      canvas.draw();
      break;
    }
    case 'user_out': {

      break;
    }
  }
};