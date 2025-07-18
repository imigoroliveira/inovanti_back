import { Router } from "express";
import { ParticipantsController } from "../controllers/ParticipantsController";

const router = Router();

router.post("/", ParticipantsController.create);
router.get("/", ParticipantsController.list);

export default router;
