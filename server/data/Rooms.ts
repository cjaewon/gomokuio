import Room from "../entity/Room";

class Rooms {
  store: { [id: string]: Room };

  constructor() {
    this.store = {};
  }

  addRoom(room: Room) {
    this.store[room.id] = room;
  }

  getRoom(id: string) {
    return this.store[id];
  }

  removeRoom(id: string) {
    delete this.store[id];
  }
}

const rooms = new Rooms();
export default rooms;