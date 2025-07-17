import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Events } from "../entities/Events";
import { Participants } from "../entities/Participants";

const eventRepo = AppDataSource.getRepository(Events);
const participantRepo = AppDataSource.getRepository(Participants);

export const EventsController = {
  async create(req: Request, res: Response) {
    const event = eventRepo.create(req.body);
    const result = await eventRepo.save(event);
    return res.status(201).json(result);
  },

  async addParticipant(req: Request, res: Response) {
    const { name, email, phone } = req.body;
    const { eventId } = req.params;

    const event = await eventRepo.findOneBy({ id: Number(eventId) });
    if (!event) return res.status(404).json({ message: "Evento não encontrado" });

    const participant = participantRepo.create({ name, email, phone, event });
    const saved = await participantRepo.save(participant);
    return res.status(201).json(saved);
  },

  async listParticipants(req: Request, res: Response) {
    const { eventId } = req.params;
    const participants = await participantRepo.find({
      where: { event: { id: Number(eventId) } },
    });
    return res.json(participants);
  },
};
