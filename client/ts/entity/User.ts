
class User {
  id: string; // socket id
  username: string;
  score: Number;

  roomId: string | null;

  constructor(id: string, username: string) {
    this.id = id;
    this.username = username;
    this.score = 0;
    this.roomId = null;
  };
};

export default User;