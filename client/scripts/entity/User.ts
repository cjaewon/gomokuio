export default class User {
  id: string;
  username: string
  profile_img: string;

  constructor(id: string, username: string, profile_img: string) {
    this.id = id;
    this.username = username;
    this.profile_img = profile_img;
  }


  toObject() {
    return this;
  }
}