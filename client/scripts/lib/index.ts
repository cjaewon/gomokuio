import socket from './socket';

export const wsSend = (name: string, data: Object) => {
  const request = { name, data };

  socket.next(request);
}