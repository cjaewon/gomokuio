"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Room {
    constructor(id, player1, player2) {
        this.id = id;
        this.player1 = player1;
        this.player2 = player2;
        this.map = Array(15).fill(0).map(() => Array(15).fill(0));
        this.turn = 'player1';
    }
    ;
}
;
exports.default = Room;
