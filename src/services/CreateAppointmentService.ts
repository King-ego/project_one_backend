import { startOfHour } from "date-fns";
import { getCustomRepository } from "typeorm";

import Appointment from "../models/appointment";
import AppointmentsRepository from "../repositories/AppointmentsRepository";

interface RequestProps {
  date: Date;
  provider_id: string;
}

class CreateAppointmentService {
  public async execute({
    date,
    provider_id,
  }: RequestProps): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate
    );

    console.log(findAppointmentInSameDate);
    if (findAppointmentInSameDate) {
      throw Error("This appointment is already booked");
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);
    return appointment;
  }
}

export default CreateAppointmentService;
