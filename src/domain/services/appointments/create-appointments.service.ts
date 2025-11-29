import { CreateAppointmentDto } from '@/core/shared/dto/appointments/create-appointment.dto';
import { PrismaService } from '@/infra/database/prisma.service';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

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
      throw new NotFoundException('User not found');
    }

    /**
     * Valida se Agenda existe, se está disponível e possíveis conflitos
     */
    const scheduleExists = await this.prismaService.schedule.findUnique({
      where: { id: data.scheduleId },
      include: { UserAgenda: true },
    });

    if (!scheduleExists) {
      throw new NotFoundException('Schedule not found');
    }

    if (!scheduleExists.isAvailable) {
      throw new ConflictException('Schedule not available');
    }

    if (scheduleExists.UserAgenda) {
      throw new ConflictException('Schedule already booked');
    }

    /**
     * Cria o agendamento
     */
    await this.prismaService.userAgenda.create({
      data: {
        status: 'SCHEDULED',
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
