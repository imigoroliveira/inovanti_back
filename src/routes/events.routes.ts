import { Router } from "express";
import { EventsController } from "../controllers/EventsController";

const router = Router();

router.post("/", EventsController.create);
router.get("/:eventId/participants", EventsController.listParticipants);
router.post("/:eventId/participants", EventsController.addParticipant);

export default router;
