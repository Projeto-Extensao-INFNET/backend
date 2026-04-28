import { Injectable } from '@nestjs/common';

import { IPrismaAppointmentsRepository } from '@/infra/database/prisma/repositories/prisma-appointments.repository';
import { CreateAppointmentDto } from '@/presentation/dtos/appointments/create-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(private readonly repo: IPrismaAppointmentsRepository) {}

  async createAppointment(data: CreateAppointmentDto) {
    await this.repo.createAppointment(data);
  }

  async cancelAppointments() {}

  async getAppointments() {}

  async updateAppointments() {}
}
