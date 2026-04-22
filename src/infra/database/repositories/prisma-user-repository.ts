import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserModel } from '@/domain/models/user.model';
import { EditProfileDto } from '@/infra/http/dtos/user/edit-profile.dto';
import { err, ok, type Result } from '@/shared/errors/result';
import {
  badRequest,
  resourceNotFound,
} from '@/shared/errors/exceptions/exceptions';
import { DEFAULT_PAGE_LIMIT, DEFAULT_PAGE_NUMBER } from '@/shared/constants';

import type {
  PaginationQueryDto,
  PaginationResultDto,
} from '@/infra/http/dtos/pagination/pagination.dto';
import type { GetUserProfileResponse } from '@/infra/http/dtos/user/get-user.dto';
import type { DeleteProfileResponseDto } from '@/infra/http/dtos/user/delete-profile.dto';

// Cria um contrato que poderá ser usado por vários repositórios reais
export abstract class IUserRepository {
  abstract uploadAvatar(userId: string, avatarUrl: string): Promise<void>;
  abstract getProfile(userId: string): Promise<Result<GetUserProfileResponse>>;
  abstract findById(id: string): Promise<Result<Omit<UserModel, 'password'>>>;
  abstract deleteProfile(id: string): Promise<Result<DeleteProfileResponseDto>>;
  abstract editProfile(
    id: string,
    dto: EditProfileDto,
  ): Promise<Result<EditProfileDto>>;
  abstract getAllUsers(
    params: PaginationQueryDto,
  ): Promise<Result<PaginationResultDto<Omit<UserModel, 'password'>>>>;
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

  // TODO => adicionar cache
  async findById(id: string): Promise<Result<Omit<UserModel, 'password'>>> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
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

    if (!user) return err(resourceNotFound('Usuário não encontrado!'));

    return ok(user);
  }

  // TODO => adicionar cache
  async getAllUsers(
    params: PaginationQueryDto,
  ): Promise<Result<PaginationResultDto<Omit<UserModel, 'password'>>>> {
    const { page = DEFAULT_PAGE_NUMBER, limit = DEFAULT_PAGE_LIMIT } = params;

    const take = Number(limit);
    const skip = (Number(page) - 1) * take;

    if (skip < 0) return err(badRequest('Query Params inválidos!'));

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
      orderBy: { createdAt: 'desc' },
    });

    if (!users) return err(resourceNotFound('Usuários não encontrados!'));

    const total = await this.prismaService.user.count();
    const totalPages = Math.ceil(total / take);

    return ok({
      data: users,
      meta: {
        total_items: total,
        total_pages: totalPages,
        page: Number(page),
        limit: Number(take),
      },
    });
  }

  // TODO => adicionar cache
  async getProfile(userId: string): Promise<Result<GetUserProfileResponse>> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
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

    if (!user) return err(resourceNotFound('Usuário não encontrado!'));

    return ok({
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: String(user.avatar),
      birthDate: user.birthDate.toISOString(),
      role: user.role,
      document: user.document,
    });
  }

  async deleteProfile(id: string): Promise<Result<DeleteProfileResponseDto>> {
    await this.prismaService.user.delete({
      where: { id },
    });
    return ok({ message: 'Perfil removido com sucesso!' });
  }

  async editProfile(
    id: string,
    dto: EditProfileDto,
  ): Promise<Result<EditProfileDto>> {
    const user = await this.prismaService.user.update({
      where: { id },
      data: dto,
      select: { name: true },
    });
    return ok(user);
  }
}
