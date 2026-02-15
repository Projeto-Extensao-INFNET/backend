import { IPrismaAppointmentsRepository } from '@/core/repositories/prisma-appointments.repository';
import type { CreateAppointmentDto } from '@/shared/dto/appointments/create-appointment.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateAppointmentsService {
  constructor(private readonly repo: IPrismaAppointmentsRepository) {}

  async exec(data: CreateAppointmentDto) {
    await this.repo.createAppointment(data);
  }
}
