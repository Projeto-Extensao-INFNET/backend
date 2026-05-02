import { Test, TestingModule } from '@nestjs/testing';
import {
  BadRequestException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';

import {
  JWT_ACCESS_TOKEN_EXPIRATION,
  JWT_REFRESH_SECRET,
  JWT_REFRESH_TOKEN_EXPIRATION,
  JWT_SECRET,
} from '@/shared/constants';

import { JwtService } from '@nestjs/jwt';
import { AuthService } from '@/application/services/auth/auth.service';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

import { generateUniqueCPF, hashPassword } from '@/utils';
import { createFakeUser } from 'test/__shared__/factories';

import { GetTokens } from '@/infra/auth/jwt/generate-jwt-tokens';

import type { DOCUMENT_TYPE, Payload, ROLE } from '@/shared/types';
import type { User } from '@/infra/database/prisma/generated/client';
import type { SignUpDto } from '@/presentation/dtos/auth/signUp.dto';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;
  let jwt: JwtService;

  const mockPrisma = {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
  };

  const mockJwt = {
    sign: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        GetTokens,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: JwtService, useValue: mockJwt },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
    jwt = module.get<JwtService>(JwtService);
  });

  describe('Services', () => {
    it('services should be defined', () => {
      expect(service).toBeDefined();
      expect(prisma).toBeDefined();
      expect(jwt).toBeDefined();
    });
  });

  describe('SignUp', () => {
    it(`should create a new user when ${AuthService.prototype.SignUp.name} is called`, async () => {
      const fakeData = createFakeUser();
      const userSignUpData: SignUpDto = createFakeUser();

      // email/document ainda nao existem no banco
      mockPrisma.user.findUnique
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(null);

      // cria um usuario no Prisma com os dados mockados
      const createdUser = {
        id: fakeData.id,
        name: fakeData.name,
        email: fakeData.email,
        birthDate: fakeData.birthDate,
        role: fakeData.role,
        documentType: fakeData.documentType,
        document: fakeData.document,
      };

      // !!FIX => corrigir tipagem, o teste está passando mas esta forcando uma tipagem indevida
      mockPrisma.user.create.mockResolvedValue(createdUser as User);

      // chama o serviço real com os dados de signUp mockados
      const result = await service.SignUp(userSignUpData);

      expect(result).not.toHaveProperty('password');
      expect(result).toMatchObject(createdUser);
      expect(prisma.user.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            email: userSignUpData.email,
            document: userSignUpData.document,
            password: expect.any(String),
          }),
        }),
      );
    });

    it('should hash user password', async () => {
      const plainPassword = 'senha_normal_123';
      const userSignUpData = createFakeUser();

      mockPrisma.user.findUnique.mockResolvedValue(null);
      mockPrisma.user.create.mockResolvedValue(userSignUpData);

      await service.SignUp(userSignUpData);

      expect(prisma.user.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            password: expect.not.stringMatching(plainPassword),
          }),
        }),
      );
    });

    it.skip('should throw ConflictException when email is already in use', async () => {
      const userSignUpData = createFakeUser();

      mockPrisma.user.findUnique.mockResolvedValue(userSignUpData);

      await expect(service.SignUp(userSignUpData)).rejects.toThrow(
        new ConflictException(ERROR_CREDENTIALS_IN_USE),
      );
      expect(prisma.user.create).not.toHaveBeenCalled();
    });

    it.skip('should throw ConflictException when document is already in use', async () => {
      const userSignUpData = createFakeUser();

      mockPrisma.user.findUnique
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(userSignUpData);

      await expect(service.SignUp(userSignUpData)).rejects.toThrow(
        new ConflictException(ERROR_CREDENTIALS_IN_USE),
      );
      expect(prisma.user.create).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException when not pass data', async () => {
      const invalidData = {
        name: '',
        email: '',
        password: '',
        birthDate: new Date(),
        role: 'PATIENT' as ROLE,
        documentType: ' CPF' as DOCUMENT_TYPE,
        document: generateUniqueCPF(),
      };

      mockPrisma.user.findUnique.mockResolvedValue(null);

      await expect(service.SignUp(invalidData)).rejects.toThrow(
        new BadRequestException(ERROR_REQUIRED_FIELDS),
      );
      expect(prisma.user.create).not.toHaveBeenCalled();
    });
  });

  describe('SignIn', () => {
    it(`should call ${AuthService.prototype.SignIn.name} and return JWT tokens`, async () => {
      const hashedPassword = await hashPassword('12345667');
      const signInUser = createFakeUser();

      mockPrisma.user.findUnique.mockResolvedValue({
        ...signInUser,
        password: hashedPassword,
      });

      const payload: Payload = {
        username: signInUser.email,
        sub: signInUser.id,
        role: signInUser.role,
      };

      // verifica se retornou os 2 tokens
      vi.spyOn(jwt, 'sign').mockReturnValueOnce('fake-jwt-token');
      vi.spyOn(jwt, 'sign').mockReturnValueOnce('fake-jwt-refresh-token');

      // faz o login
      const result = await service.SignIn({
        email: 'test@acme.com',
        password: '12345667',
      });

      // espera que retorne exatamente os 2 tokens criados
      expect(result).toEqual({
        accessToken: 'fake-jwt-token',
        refreshToken: 'fake-jwt-refresh-token',
        data: { user: payload },
      });

      // espera que os tokens sejam gerados com o payload +  expiresIn + secret
      expect(jwt.sign).toHaveBeenCalledWith(
        {
          ...payload,
        },
        { expiresIn: JWT_ACCESS_TOKEN_EXPIRATION, secret: JWT_SECRET },
      );
      expect(jwt.sign).toHaveBeenCalledWith(
        {
          ...payload,
        },
        { expiresIn: JWT_REFRESH_TOKEN_EXPIRATION, secret: JWT_REFRESH_SECRET },
      );
    });

    it.skip('should throw UnauthorizedException when email is incorrect', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      await expect(
        service.SignIn({
          email: 'test_errado@acme.com',
          password: 'senha__123',
        }),
      ).rejects.toThrow(new UnauthorizedException(ERROR_INVALID_CREDENTIALS));
      expect(prisma.user.update).not.toHaveBeenCalled();
    });

    it.skip('should throw UnauthorizedException when password is incorrect', async () => {
      const hashedPassword = await hashPassword('deve_ser_hashed_123');
      const signInUser = createFakeUser();

      mockPrisma.user.findUnique.mockResolvedValue({
        ...signInUser,
        password: hashedPassword,
      });

      await expect(
        service.SignIn({
          email: 'test_errado@acme.com',
          password: 'senha_123',
        }),
      ).rejects.toThrow(new UnauthorizedException(ERROR_INVALID_CREDENTIALS));
      expect(prisma.user.update).not.toHaveBeenCalled();
    });
  });
});
