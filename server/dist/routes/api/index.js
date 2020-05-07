"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api = express_1.Router();
api.get('/ranking', (rep, res) => {
    const users = Object.entries(global.db.users);
    users.sort((i, j) => i[1].score < j[1].score ? 1 : 0);
    users.slice(0, 10);
    const body = {
        ranking: users.map(user => user[1].toData()),
    };
    res.status(200).send(body);
});
exports.default = api;
