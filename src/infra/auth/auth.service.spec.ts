import {
  BadRequestException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ERROR_CREDENTIALS_IN_USE,
  ERROR_REQUIRED_FIELDS,
  ERROR_INVALID_CREDENTIALS,
} from '@/shared/errors';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import type { DOCUMENT_TYPE, ROLE } from '@/shared/types';
import {
  generateBirthDate,
  generateUniqueCPF,
  generateUniqueEmail,
  generateUniqueName,
  hashPassword,
} from '@/utils';
import { AuthService } from '@/infra/auth/auth.service';
import { PrismaService } from '@/infra/database/prisma.service';
import { JWTMockService } from '@/test/mocks/jwt';
import { MockPrismaService } from '@/test/mocks/prisma';
import { CreateMockUser } from '@/test/mocks/create-mock-user/create-mock-user';

describe('AuthService', () => {
  let service: AuthService;
  const mockPrismaService = MockPrismaService();
  const mockJwtService = JWTMockService();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('SignUp', () => {
    it('should create a new user', async () => {
      // dados para criar um novo usuario
      const userSignUpData = CreateMockUser;

      // verifica se credenciais (email) já estão em uso
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      // simula dados que serão enviados pro Prisma
      const created_user = {
        id: 'new-user-id',
        name: userSignUpData.name,
        email: userSignUpData.email,
        role: userSignUpData.role,
        document: userSignUpData.document,
        documentType: userSignUpData.documentType,
        birthDate: userSignUpData.birthDate,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // cria um usuario no Prisma com os dados mockados
      mockPrismaService.user.create.mockResolvedValue(created_user);

      // chama o serviço real com os dados de signUp mockados
      const result = await service.SignUp(userSignUpData);

      // verifica que a senha não foi retornada
      expect(result).not.toHaveProperty('password');

      // verifica se os dados estão corretos
      expect(result).toMatchObject({
        id: 'new-user-id',
        name: userSignUpData.name,
        email: userSignUpData.email,
        role: userSignUpData.role,
        document: userSignUpData.document,
        documentType: userSignUpData.documentType,
        birthDate: userSignUpData.birthDate,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });

      // verifica se email  já existe antes de criar
      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: {
          email: userSignUpData.email,
        },
      });

      // verifica se documento já existe antes de criar
      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: {
          document: userSignUpData.document,
        },
      });

      // verifica se o usuario foi criado apenas 1 vez
      expect(mockPrismaService.user.create).toHaveBeenCalledTimes(1);
    });

    it('should hash password', async () => {
      const plainPassword = 'senha_normal_123';

      const userSignUpData = {
        name: generateUniqueName(),
        email: generateUniqueEmail(),
        password: plainPassword,
        birthDate: generateBirthDate(),
        role: 'PATIENT' as ROLE,
        documentType: 'CPF' as DOCUMENT_TYPE,
        document: generateUniqueCPF(),
      };

      mockPrismaService.user.findUnique.mockResolvedValue(null);

      mockPrismaService.user.create.mockResolvedValue({
        id: 'user-id',
        ...userSignUpData,
        password: 'hashed_password',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await service.SignUp(userSignUpData);

      expect(mockPrismaService.user.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            password: expect.not.stringMatching(plainPassword),
          }),
        }),
      );
    });

    it('should throw conflict exception when email is already in use', async () => {
      const userSignUpData = {
        name: generateUniqueName(),
        email: generateUniqueEmail(),
        password: '23456678',
        birthDate: generateBirthDate(),
        role: 'PATIENT' as ROLE,
        documentType: ' CPF' as DOCUMENT_TYPE,
        document: generateUniqueCPF(),
      };

      mockPrismaService.user.findUnique.mockResolvedValue({
        id: 'user-id',
        email: userSignUpData.email,
      });

      await expect(service.SignUp(userSignUpData)).rejects.toThrow(
        new ConflictException(ERROR_CREDENTIALS_IN_USE),
      );
    });

    it('should throw bad request exception when not pass data', async () => {
      const invalidData = {
        name: '',
        email: '',
        password: '',
        birthDate: new Date(),
        role: 'PATIENT' as ROLE,
        documentType: ' CPF' as DOCUMENT_TYPE,
        document: generateUniqueCPF(),
      };

      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.SignUp(invalidData)).rejects.toThrow(
        new BadRequestException(ERROR_REQUIRED_FIELDS),
      );
    });
  });

  describe('SignIn', () => {
    it('should sign-in and return JWT token', async () => {
      const hashedPassword = await hashPassword('12345667');

      mockPrismaService.user.findUnique.mockResolvedValue({
        id: 'user-id',
        email: 'test@acme.com',
        password: hashedPassword,
      });

      mockJwtService.sign.mockReturnValue('fake-jwt-token');

      const result = await service.SignIn({
        email: 'test@acme.com',
        password: '12345667',
      });

      expect(result).toEqual({ accessToken: 'fake-jwt-token' });
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        username: 'test@acme.com',
        sub: 'user-id',
      });
    });

    it('should throw unauthorized exception when email is incorrect', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(
        service.SignIn({
          email: 'test_errado@acme.com',
          password: 'senha__123',
        }),
      ).rejects.toThrow(new UnauthorizedException(ERROR_INVALID_CREDENTIALS));
    });

    it('should throw unauthorized exception when password is incorrect', async () => {
      const hashedPassword = await hashPassword('deve_ser_hashed_123');

      mockPrismaService.user.findUnique.mockResolvedValue({
        id: 'user-id',
        email: 'test@acme.com',
        password: hashedPassword,
      });

      await expect(
        service.SignIn({
          email: 'test_errado@acme.com',
          password: 'senha_123',
        }),
      ).rejects.toThrow(new UnauthorizedException(ERROR_INVALID_CREDENTIALS));
    });
  });
});
