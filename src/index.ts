import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./database/data-source";
import eventRoutes from "./routes/events.routes";
import eventParticipants from "./routes/participants.routes";

const app = express();
app.use(express.json());

app.use("/events", eventRoutes);
app.use("/participants", eventParticipants);

AppDataSource.initialize().then(() => {
  console.log("Banco conectado!");
  app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
});
