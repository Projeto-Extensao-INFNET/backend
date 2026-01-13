import { CreateAppointmentDto } from '@/shared/dto/appointments/create-appointment.dto';
import type { QUERY_STATUS } from '@/shared/types';
import { PrismaService } from '@/infra/database/prisma.service';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  ERROR_SCHEDULE_ALREADY_BOOKED,
  ERROR_SCHEDULE_NOT_AVAILABLE,
  ERROR_SCHEDULE_NOT_FOUND,
  ERROR_USER_NOT_FOUND,
} from '@/shared/errors';

@Injectable()
export class CreateAppointmentsService {
  constructor(private readonly prismaService: PrismaService) {}
  async createAppointments(data: CreateAppointmentDto) {
    /**
     * Valida se existe um usuário
     */
    const userExists = await this.prismaService.user.findUnique({
      where: { id: data.userId },
    });

    if (!userExists) {
      throw new NotFoundException(ERROR_USER_NOT_FOUND);
    }

    /**
     * Valida se Agenda existe, se está disponível e possíveis conflitos
     */
    const scheduleExists = await this.prismaService.schedule.findUnique({
      where: { id: data.scheduleId },
      include: { UserAgenda: true },
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

    /**
     * Cria o agendamento
     */
    await this.prismaService.userAgenda.create({
      data: {
        status: 'SCHEDULED' as QUERY_STATUS,
        user: {
          connect: { id: data.userId },
        },
        schedule: {
          connect: { id: data.scheduleId },
        },
      },
      include: {
        user: true,
        schedule: true,
      },
    });

    /**
     * Transforma a consulta que estava disponível para indisponível
     */
    await this.prismaService.schedule.update({
      where: { id: data.scheduleId },
      data: { isAvailable: false },
    });
  }
}
