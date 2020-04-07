"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../entity/User"));
function event(ws, id, socketData) {
    const response = JSON.parse(socketData);
    const name = response.name;
    const data = response.data;
    switch (name) {
        case 'join':
            const user = new User_1.default(id, data.username);
            global.db.users[id] = user;
            ws.send(JSON.stringify({ user }));
            break;
    }
}
exports.default = event;
;
exports.close = (id) => {
    delete global.db.users[id];
};
