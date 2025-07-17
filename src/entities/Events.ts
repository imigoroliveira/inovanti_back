import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Participants } from "./Participants";

@Entity()
export class Events {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: "timestamp" })
  date: Date;

  @OneToMany(() => Participants, (p) => p.event)
  participants: Participants[];
}
