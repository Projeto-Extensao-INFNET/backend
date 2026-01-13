import { Injectable, NotFoundException } from '@nestjs/common';
import type { Professional } from '../../infra/database/generated/client';
import { PrismaService } from '@/infra/database/prisma.service';
import { UserEntity } from '@/core/entities/user.entity';
import { EditProfileDto } from '@/shared/dto/user/edit-profile.dto';
import type { GetUserProfileDto } from '@/shared/dto/user/get-user.dto';
import { ERROR_USER_NOT_FOUND } from '@/shared/errors';

// Cria um contrato que poderá ser usado por vários repositórios reais
export abstract class IUserRepository {
  abstract getProfile(userId: string): Promise<GetUserProfileDto | null>;
  abstract findById(id: string): Promise<Omit<UserEntity, 'password'>>;
  abstract deleteProfile(id: string): Promise<void>;
  abstract editProfile(
    id: string,
    dto: EditProfileDto,
  ): Promise<EditProfileDto>;
  abstract listProfessionals(): Promise<Professional[]>; // vai pro repo de professionals
}

// implementação real do IUserRepository usando o Prisma para acessar o banco de dados
@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: string): Promise<Omit<UserEntity, 'password'>> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
        birthDate: true,
        document: true,
        documentType: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException(ERROR_USER_NOT_FOUND);
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
      throw new NotFoundException(ERROR_USER_NOT_FOUND);
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

  async editProfile(id: string, dto: EditProfileDto): Promise<EditProfileDto> {
    const user = await this.prismaService.user.update({
      where: { id },
      data: dto,
      select: {
        id: true,
        name: true,
        email: true,
        birthDate: true,
        document: true,
        documentType: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
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
