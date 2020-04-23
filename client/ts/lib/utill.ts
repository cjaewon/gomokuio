import Canvas from "./Canvas";

export const bind = (name: string, data: any) => {
  return JSON.stringify({
    name,
    data,
  });
};

export const exitGame = (canvas: Canvas) => {
  const chatList = document.getElementById('chat-list')!;

  document.getElementById('start-menu')!.style.display = 'block';
  document.getElementById('setting')!.style.display = 'flex';
  document.getElementById('loader')!.style.display = 'none';

  window.db.room = null;
  window.db.user!.roomId = '';

  canvas.show(false);
  
  while (chatList.firstChild) {
    chatList.firstChild.remove();
  }
};