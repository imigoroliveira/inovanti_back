import { Router } from "express";
import { ParticipantsController } from "../controllers/ParticipantsController";

const router = Router();

router.post("/", ParticipantsController.create);

export default router;
