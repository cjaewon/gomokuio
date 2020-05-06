"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const Room_1 = __importDefault(require("../entity/Room"));
const router = express_1.Router();
const invite = (req, res) => {
    const id = req.query.id;
    if (!id)
        return;
    const room = global.db.inviteMatch[id].room;
    if (!room)
        return false;
    res.json({
        room: room.toData(),
    });
};
const createInviteCode = (req, res) => {
    const id = uuid_1.v4();
    global.db.inviteMatch[id] = {
        room: new Room_1.default(uuid_1.v4(), null, null),
        time: new Date(),
    };
    res.json({
        inviteId: id,
    });
};
router.get('/invite', invite);
router.get('/create-invite-code', createInviteCode);
exports.default = router;
