import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Events } from "./Events";

@Entity()
export class Participants {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @ManyToOne(() => Events, (event) => event.participants)
  event: Events;
}
