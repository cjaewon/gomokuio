import { Router } from 'express';

const api = Router();

api.get('/ranking', (rep, res) => {
  const users = Object.entries(global.db.users);
  
  users.sort((i, j) => i[1].score > j[1].score ? 1 : 0);
  users.slice(0, 10);

  const body = {
    ranking: users.map(user => user[1].toData()),  
  };

  res.status(200).send(body);
});

export default api;