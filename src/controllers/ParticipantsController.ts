import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Participants } from "../entities/Participants";

const repo = AppDataSource.getRepository(Participants);

export const ParticipantsController = {
  async create(req: Request, res: Response) {
    const participant = repo.create(req.body);
    const result = await repo.save(participant);
    return res.json(result);
  },

  async list(req: Request, res: Response) {
    const participants = await repo.find();
    return res.json(participants);
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    await repo.update(id, req.body);
    return res.sendStatus(204);
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await repo.delete(id);
    return res.sendStatus(204);
  },
};
