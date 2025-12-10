import { Injectable, NotFoundException } from '@nestjs/common';
import type { Professional } from 'generated/prisma';
import { PrismaService } from '@/infra/database/prisma.service';
import { UserEntity } from '@/core/entities/user.entity';
import { EditProfileDto } from '@/core/dto/user/edit-profile.dto';
import { IUserRepository } from '../../core/repositories/user.repository';

// implementação real do IUserRepository usando o Prisma para acessar o banco de dados
@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async getProfile(userId: string): Promise<UserEntity | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async deleteProfile(id: string): Promise<void> {
    await this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }

  async editProfile(id: string, dto: EditProfileDto): Promise<UserEntity> {
    const user = await this.prismaService.user.update({
      where: { id },
      data: dto,
    });

    return user;
  }

  // vai pro prisma-professional-repository
  async listProfessionals(): Promise<Professional[]> {
    const professionals = await this.prismaService.professional.findMany({
      select: {
        id: true,
        typeOfQuery: true,
        price: true,
        paymentMethod: true,
        document: true,
        documentType: true,
        gender: true,
        avatar: true,
        phone: true,
        userId: true,
        specialtyId: true,
        typeOfTreatmentId: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        specialty: {
          select: {
            name: true,
          },
        },
        typeOfTreatment: {
          select: {
            name: true,
          },
        },
      },
    });

    return professionals;
  }
}
