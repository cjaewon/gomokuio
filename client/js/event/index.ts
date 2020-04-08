import User from "../entity/User";

export default function event(ws: WebSocket, socketData: any) {
  const response = JSON.parse(socketData);

  const name = response.name;
  const data = response.data;

  switch (name) {
    case 'user_data':
      window.db.user = new User(data.user.id, data.user.username);
      break;
    case 'game_start':
      alert('game_start');
      console.log(data)
      document.getElementById('start-menu')!.style.display = 'none';
      document.getElementById('loader')!.style.display = 'none';
      break;

  }
};