import {
  conflict,
  resourceNotFound,
} from '@/shared/errors/exceptions/exceptions';
import { err, ok, type Result } from '@/shared/errors/result';

import { CreateAppointmentDto } from '@/presentation/dtos/appointments/create-appointment.dto';

import type { PrismaService } from '../prisma.service';

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

      if (!userExists) return err(resourceNotFound('Usuário não encontrado!'));

      // Valida se Agenda do Profissional existe e possíveis conflitos/falta de campos
      const scheduleExists = await prisma.schedule.findUnique({
        where: { id: data.scheduleId },
        include: { UserAgenda: true, professional: true },
      });

      if (!scheduleExists)
        return err(resourceNotFound('Agendamento não encontrado!'));

      if (!scheduleExists?.isAvailable)
        return err(conflict('Agendamento indisponível!'));

      if (scheduleExists?.UserAgenda)
        return err(conflict('Agendamento indisponível!'));

      if (scheduleExists?.professional.specialtyId !== data.specialtyId)
        return err(conflict('Agendamento indisponível!'));

      if (
        scheduleExists?.professional.typeOfTreatmentId !==
        data.typeOfTreatmentId
      )
        return err(conflict('Agendamento indisponível!'));

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
