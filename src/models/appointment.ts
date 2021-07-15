import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
@Entity("apointments")
class Appointment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  provider: string;

  @Column("timestamp with time zone")
  date: Date;

  // constructor({ provider, date }: Omit<Appointment, "id">) {
  //   this.id = uuid();
  //   this.provider = provider;
  //   this.date = date;
  // }
}
export default Appointment;
/*versão que não entendi
import { uuid } from "uuidv4";
class Appointment {
  id: string;

  provider: string;
  date: Date;

  constructor({ provider, date }: Omit<Appointment, "id">) {
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  }
}
export default Appointment;
 */
