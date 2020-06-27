import ws from 'ws';

import { users } from '../data';
import { uuid4 } from '../lib/uuid';

type Response = {
  name: string;
  data: any; 
}

export const message = async(ws: ws, wsData: string) => {
  const response: Response = JSON.parse(wsData);

  switch (response.name) {
    case 'login': {
      const id = uuid4();
      // users[id] = 

      break;
    }
  }
};

export const close = async(ws: ws) => {

};