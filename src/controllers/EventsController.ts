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
    const { email } = req.body;
    const { eventId } = req.params;

    const event = await eventRepo.findOneBy({ id: Number(eventId) });
    if (!event) return res.status(404).json({ message: "Evento não encontrado" });

    const participant = await participantRepo.findOneBy({ email });
    if (!participant) return res.status(404).json({ message: "Participante não encontrado" });

    participant.event = event;
    const saved = await participantRepo.save(participant);
    return res.status(201).json(saved);
  },

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const event = await eventRepo.findOneBy({ id: Number(id) });
    return res.json(event);
  },

  async getByTitle(req: Request, res: Response) {
    const { title } = req.params;
    const event = await eventRepo.findOneBy({ name: title });
    return res.json(event);
  },

  async list(req: Request, res: Response) {
    const events = await eventRepo.find();
    return res.json(events);
  },

  async listParticipants(req: Request, res: Response) {
    const { eventId } = req.params;
    const participants = await participantRepo.find({
      where: { event: { id: Number(eventId) } },
    });
    return res.json(participants);
  },
};
