"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Room {
    constructor(id, player1, player2) {
        this.id = id;
        this.player1 = player1;
        this.player2 = player2;
        this.map = new Array(new Array(15), new Array(15));
    }
    ;
}
;
exports.default = Room;
