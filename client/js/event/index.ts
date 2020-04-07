import User from "../entity/User";

export default function event(ws: WebSocket, socketData: any) {
  const response = JSON.parse(socketData);

  const name = response.name;
  const data = response.data;

  switch (name) {
    case 'user_data':
      window.db.user = new User(data.user.id, data.user.username);
      break;
    }
};