import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Participants } from "../entities/Participants";

const repo = AppDataSource.getRepository(Participants);

export const ParticipantsController = {
  async create(req: Request, res: Response) {
    const { name, email, phone } = req.body;
    const participant = repo.create({ name, email, phone });
    const result = await repo.save(participant);
    return res.status(201).json(result);
  },

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const participant = await repo.findOneBy({ id: Number(id) });
    return res.json(participant);
  },

  async getByEmail(req: Request, res: Response) {
    const { email } = req.params;
    const participant = await repo.findOneBy({ email });
    return res.json(participant);
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
