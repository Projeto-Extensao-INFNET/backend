import { Injectable, NotFoundException } from '@nestjs/common';

import type {
  PaginationQueryDto,
  PaginationResultDto,
} from '@/shared/dto/pagination/pagination.dto';
import type { GetUserProfileResponse } from '@/shared/dto/user/get-user.dto';

import { PrismaService } from '../prisma/prisma.service';
import { UserEntity } from '@/core/entities/user.entity';
import { DEFAULT_PAGE_LIMIT, DEFAULT_PAGE_NUMBER } from '@/shared/constants';
import { EditProfileDto } from '@/shared/dto/user/edit-profile.dto';
import { ERROR_USERS_NOT_FOUND, ERROR_USER_NOT_FOUND } from '@/shared/errors';

// Cria um contrato que poderá ser usado por vários repositórios reais
export abstract class IUserRepository {
  abstract uploadAvatar(userId: string, avatarUrl: string): Promise<void>;
  abstract getProfile(userId: string): Promise<GetUserProfileResponse>;
  abstract findById(id: string): Promise<Omit<UserEntity, 'password'>>;
  abstract deleteProfile(id: string): Promise<unknown>;
  abstract editProfile(
    id: string,
    dto: EditProfileDto,
  ): Promise<EditProfileDto>;
  abstract getAllUsers(
    params: PaginationQueryDto,
  ): Promise<PaginationResultDto<Omit<UserEntity, 'password'>>>;
}

// implementação real do IUserRepository usando o Prisma para acessar o banco de dados
@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async uploadAvatar(userId: string, avatarUrl: string): Promise<void> {
    await this.prismaService.user.update({
      where: { id: userId },
      data: { avatar: avatarUrl },
    });
  }

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

    if (!user) throw new NotFoundException(ERROR_USER_NOT_FOUND);

    return user;
  }

  async getAllUsers(
    params: PaginationQueryDto,
  ): Promise<PaginationResultDto<Omit<UserEntity, 'password'>>> {
    const { page = DEFAULT_PAGE_NUMBER, limit = DEFAULT_PAGE_LIMIT } = params;
    const take = Number(limit);
    const skip = (Number(page) - 1) * take;

    const users = await this.prismaService.user.findMany({
      skip,
      take,
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        password: false,
        birthDate: true,
        document: true,
        documentType: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!users) throw new NotFoundException(ERROR_USERS_NOT_FOUND);

    const total = await this.prismaService.user.count();
    const totalPages = Math.ceil(total / take);

    return {
      data: users,
      meta: {
        total_items: total,
        total_pages: totalPages,
        page,
        limit,
      },
    };
  }

  async getProfile(userId: string): Promise<GetUserProfileResponse> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
        avatar: true,
        birthDate: true,
        document: true,
        documentType: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) throw new NotFoundException(ERROR_USER_NOT_FOUND);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: String(user.avatar),
      birthDate: user.birthDate.toISOString(),
      role: user.role,
      document: user.document,
    };
  }

  async deleteProfile(id: string) {
    await this.prismaService.user.delete({
      where: {
        id,
      },
    });

    return { message: 'Usuário removido com sucesso!' };
  }

  async editProfile(id: string, dto: EditProfileDto): Promise<EditProfileDto> {
    const user = await this.prismaService.user.update({
      where: { id },
      data: dto,
      select: {
        name: true,
      },
    });

    return user;
  }
}
