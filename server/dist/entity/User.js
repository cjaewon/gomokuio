"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const utill_1 = require("../lib/utill");
class User {
    constructor(ws, id, username) {
        this.id = id;
        this.username = username;
        this.score = 0;
        this.roomId = null;
        this.ws = ws;
    }
    send(name, body) {
        this.ws.send(utill_1.bind(name, body));
    }
    toData() {
        const _a = this, { ws } = _a, data = __rest(_a, ["ws"]);
        return data;
    }
}
;
exports.default = User;
