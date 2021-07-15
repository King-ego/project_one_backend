import { EntityRepository, Repository } from "typeorm";

import Appoitment from "../models/appointment";

@EntityRepository(Appoitment) //decoration com o model como parametro
class AppointmentsRepository extends Repository<Appoitment> {
  public async findByDate(date: Date): Promise<Appoitment | null> {
    const findAppointment = await this.findOne({
      where: { date: date },
    });

    return findAppointment || null;
  }
}

export default AppointmentsRepository;

/* versão que eu não entendi

import { isEqual } from "date-fns";
import Appoitment from "../models/appointment";

interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Appoitment[];

  constructor() {
    this.appointments = [];
  }

  public all(): Appoitment[] {
    return this.appointments;
  }

  public findByDate(date: Date): Appoitment | null {
    const findAppointment = this.appointments.find((appointment) =>
      isEqual(date, appointment.date)
    );

    return findAppointment || null;
  }

  public create({ provider, date }: CreateAppointmentDTO): Appoitment {
    const appointment = new Appoitment({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
*/
