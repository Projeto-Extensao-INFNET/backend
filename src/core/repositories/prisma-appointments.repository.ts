import type { PrismaService } from '@/infra/database/prisma.service';
import type { CreateAppointmentDto } from '@/shared/dto/appointments/create-appointment.dto';
import {
  ERROR_SCHEDULE_ALREADY_BOOKED,
  ERROR_SCHEDULE_NOT_AVAILABLE,
  ERROR_SCHEDULE_NOT_FOUND,
  ERROR_USER_NOT_FOUND,
} from '@/shared/errors';
import { ConflictException, NotFoundException } from '@nestjs/common';

export abstract class IPrismaAppointmentsRepository {
  abstract createAppointment: (data: CreateAppointmentDto) => Promise<void>;
}

export class PrismaAppointmentsRepository
  implements IPrismaAppointmentsRepository
{
  constructor(private readonly prismaService: PrismaService) {}

  async createAppointment(data: CreateAppointmentDto): Promise<void> {
    await this.prismaService.$transaction(async (prisma) => {
      // Valida se existe um usuário
      const userExists = await prisma.user.findUnique({
        where: { id: data.userId },
      });

      if (!userExists) {
        throw new NotFoundException(ERROR_USER_NOT_FOUND);
      }

      // Valida se Agenda existe e possíveis conflitos/falta de campos
      const scheduleExists = await prisma.schedule.findUnique({
        where: { id: data.scheduleId },
        include: { UserAgenda: true, professional: true },
      });

      if (!scheduleExists) {
        throw new NotFoundException(ERROR_SCHEDULE_NOT_FOUND);
      }

      if (!scheduleExists.isAvailable) {
        throw new ConflictException(ERROR_SCHEDULE_NOT_AVAILABLE);
      }

      if (scheduleExists.UserAgenda) {
        throw new ConflictException(ERROR_SCHEDULE_ALREADY_BOOKED);
      }

      if (scheduleExists.professional.specialtyId !== data.specialtyId) {
        throw new ConflictException('');
      }

      if (
        scheduleExists.professional.typeOfTreatmentId !== data.typeOfTreatmentId
      ) {
        throw new ConflictException('');
      }

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
              // Transforma a consulta que estava disponível para indisponível
              isConfirmed: true,
              isAvailable: false,
            },
          },
          status: 'COMPLETED',
        },
      });
    });
  }
}
