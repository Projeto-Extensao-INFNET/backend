import { Injectable } from '@nestjs/common';
import { comparePassword, hashPassword } from '@/utils';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { GetTokens } from '../../../infra/auth/jwt/generate-jwt-tokens';
import {
  badRequest,
  conflict,
  resourceNotFound,
  unauthorized,
} from '@/shared/errors/exceptions/exceptions';
import { err, ok, type Result } from '@/shared/errors/result';

import type {
  SignUpDto,
  SignUpResponseDto,
} from '@/presentation/dtos/auth/signUp.dto';
import type {
  SignInDto,
  SignInResponseDto,
} from '@/presentation/dtos/auth/signIn.dto';
import { PrismaAuthUserMapper } from '@/infra/database/prisma/mappers/prisma-user.mapper';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly getTokens: GetTokens,
  ) {}

  // Cadastro
  async SignUp(data: SignUpDto): Promise<Result<SignUpResponseDto>> {
    // valida campos obrigatórios
    if (!data || !data.name || !data.email || !data.password)
      return err(badRequest('Requisição inválida! Os campos estão incorretos'));

    const existingEmail = await this.prismaService.user.findUnique({
      where: { email: data.email },
    });

    if (existingEmail) return err(conflict('Credenciais inválidas!'));

    // Verifica se documento já existe
    const existingDocument = await this.prismaService.user.findUnique({
      where: { document: data.document },
    });

    if (existingDocument) return err(conflict('Credenciais inválidas!'));

    const hashedPassword = await hashPassword(data.password);

    const raw = PrismaAuthUserMapper.toPrisma({
      ...data,
      password: hashedPassword,
    });

    const user = await this.prismaService.user.create({
      data: raw,
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
        birthDate: true,
        role: true,
        documentType: true,
        document: true,
      },
    });

    return ok(user);
  }

  // Login
  async SignIn(data: SignInDto): Promise<Result<SignInResponseDto>> {
    const user = await this.prismaService.user.findUnique({
      where: { email: data.email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        role: true,
      },
    });

    if (!user) return err(resourceNotFound(`Usuário`));

    const isPasswordHashed = await comparePassword(
      data.password,
      user.password,
    );

    if (!isPasswordHashed) return err(unauthorized('Credenciais inválidas!'));

    // dados que vão para o JWT
    const payload = {
      username: user.email,
      sub: user.id,
      role: user.role,
    };

    // gera os tokens JWT com os dados do payload
    const tokens = await this.getTokens.exec(payload);

    // faz o hash do refreshToken
    const hashedRefreshToken = await hashPassword(tokens.refreshToken);

    // atualiza o refreshToken no banco de dados
    await this.prismaService.user.update({
      where: { id: user.id },
      data: { refreshToken: hashedRefreshToken },
    });

    return ok({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      payload: { user: payload },
    });
  }
}
