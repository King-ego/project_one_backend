import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import Users from "./users";
@Entity("apointments")
class Appointment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  provider_id: string;

  @ManyToOne(() => Users)
  @JoinColumn({ name: "provider_id" })
  provide: Users;

  @Column("timestamp with time zone")
  date: Date;

  @CreateDateColumn()
  createat: Date;

  @UpdateDateColumn()
  updateat: Date;
}
export default Appointment;
