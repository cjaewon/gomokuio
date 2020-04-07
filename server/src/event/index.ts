import ws from 'ws';
import User from "../entity/User";

export default function event(ws: ws, id: string, socketData: any) {
  const response = JSON.parse(socketData);

  const name = response.name;
  const data = response.data;

  switch (name) {
    case 'join':
      if ((data.username as string).length > 7) return;

      const user = new User(id, data.username);
      global.db.users[id] = user;
      
      ws.send(JSON.stringify({ 
        name: 'user_data',
        data : { user },
      }));

      break;
  }
};

export const close = (id: string) => {
  delete global.db.users[id];
};
