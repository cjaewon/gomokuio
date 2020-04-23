import { Router, Request, Response } from "express";
import { v4 as uuid4 } from 'uuid';
import Room from "../entity/Room";

const router = Router();

const createInviteCode = (req: Request, res: Response) => {
  const id = uuid4();

  global.db.inviteMatch[id] = {
    room: new Room(uuid4(), null, null),
    time: new Date(),
  };
};

router.get('create-invite-code', createInviteCode);

export default router;