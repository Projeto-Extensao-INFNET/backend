import { ok, type Result } from '@/shared/errors/result';
import { CreateAppointmentDto } from '@/infra/http/dtos/appointments/create-appointment.dto';
import {
  conflict,
  resourceNotFound,
} from '@/shared/errors/exceptions/exceptions';

import type { PrismaService } from '../prisma/prisma.service';

export abstract class IPrismaAppointmentsRepository {
  abstract createAppointment: (
    data: CreateAppointmentDto,
  ) => Promise<Result<CreateAppointmentDto>>;
}

export class PrismaAppointmentsRepository
  implements IPrismaAppointmentsRepository
{
  constructor(private readonly prismaService: PrismaService) {}

  async createAppointment(
    data: CreateAppointmentDto,
  ): Promise<Result<CreateAppointmentDto>> {
    return this.prismaService.$transaction(async (prisma) => {
      // Valida se existe um usuário
      const userExists = await prisma.user.findUnique({
        where: { id: data.userId },
      });

      if (!userExists) resourceNotFound('Usuário não encontrado!');

      // Valida se Agenda do Profissional existe e possíveis conflitos/falta de campos
      const scheduleExists = await prisma.schedule.findUnique({
        where: { id: data.scheduleId },
        include: { UserAgenda: true, professional: true },
      });

      if (!scheduleExists) resourceNotFound('Agendamento não encontrado!');

      if (!scheduleExists?.isAvailable) conflict('Agendamento indisponível!');

      if (scheduleExists?.UserAgenda) conflict('Agendamento indisponível!');

      if (scheduleExists?.professional.specialtyId !== data.specialtyId)
        conflict('Agendamento indisponível!');

      if (
        scheduleExists?.professional.typeOfTreatmentId !==
        data.typeOfTreatmentId
      )
        conflict('Agendamento indisponível!');

      // Cria o agendamento
      await prisma.userAgenda.upsert({
        where: {
          scheduleId: data.scheduleId,
        },

        create: {
          status: 'SCHEDULED',
          isCompleted: false,
          user: {
            connect: {
              id: data.userId,
            },
          },
          schedule: {
            connect: {
              id: data.scheduleId,
              isAvailable: true,
              isConfirmed: false,
            },
          },
        },

        update: {
          schedule: {
            update: {
              isConfirmed: true,
              isAvailable: false,
            },
          },
          status: 'COMPLETED',
        },
      });

      return ok(data);
    });
  }
}
