export default class User {
  id: string;
  username: string
  profile_img: string;
  score: number;

  constructor(id: string, username: string, profile_img: string) {
    this.id = id;
    this.username = username;
    this.profile_img = profile_img;
    this.score = 0;
  }


  toObject() {
    return this;
  }
}