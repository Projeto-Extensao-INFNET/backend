import {
	BadRequestException,
	ConflictException,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import type { DocumentType, ROLE } from '@/_types';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { JWTMockService } from '@/test/mocks/jwt';
import { MockPrismaService } from '@/test/mocks/prisma';
import {
	generateBirthDate,
	generateUniqueDocument,
	generateUniqueEmail,
	generateUniqueName,
	hashPassword,
} from '@/utils';
import { AuthService } from './auth.service';

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

	afterEach(() => {
		vi.clearAllMocks();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('SignUp', () => {
		it('should create a new user and return user without password', async () => {
			const userSignUpData = {
				name: generateUniqueName(),
				email: generateUniqueEmail(),
				password: await hashPassword('1234567878'),
				birthDate: generateBirthDate(),
				role: 'PATIENT' as ROLE,
				documentType: 'CPF' as DocumentType,
				document: generateUniqueDocument(),
			};

			mockPrismaService.user.findUnique.mockResolvedValue(null);

			const createdUser = {
				id: 'new-user-id',
				name: userSignUpData.name,
				email: userSignUpData.email,
				password: 'hashed_password',
				role: userSignUpData.role,
				document: userSignUpData.document,
				documentType: userSignUpData.documentType,
				birthDate: userSignUpData.birthDate,
				createdAt: new Date(),
				updatedAt: new Date(),
			};

			mockPrismaService.user.create.mockResolvedValue(createdUser);

			const result = await service.SignUp(userSignUpData);

			expect(result).not.toHaveProperty('password');
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
			expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
				where: {
					email: userSignUpData.email,
				},
			});
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
				documentType: 'CPF' as DocumentType,
				document: generateUniqueDocument(),
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

			expect(mockPrismaService.user.create).toHaveBeenCalledWith({
				data: expect.objectContaining({
					password: expect.not.stringMatching(plainPassword),
				}),
			});
		});

		it('should throw conflict exception when email is already in use', async () => {
			const userSignUpData = {
				name: generateUniqueName(),
				email: generateUniqueEmail(),
				password: '23456678',
				birthDate: generateBirthDate(),
				role: 'PATIENT' as ROLE,
				documentType: 'CPF' as DocumentType,
				document: generateUniqueDocument(),
			};

			mockPrismaService.user.findUnique.mockResolvedValue({
				id: 'user-id',
				email: userSignUpData.email,
			});

			await expect(service.SignUp(userSignUpData)).rejects.toThrow(
				new ConflictException('Credentials already in use'),
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

			const result = await service.SignIn('test@acme.com', '12345667');

			expect(result).toEqual({ accessToken: 'fake-jwt-token' });
			expect(mockJwtService.sign).toHaveBeenCalledWith({
				username: 'test@acme.com',
				sub: 'user-id',
			});
		});

		it('should throw unauthorized exception when email is incorrect', async () => {
			mockPrismaService.user.findUnique.mockResolvedValue(null);

			await expect(
				service.SignIn('test_errado@acme.com', 'senha__123'),
			).rejects.toThrow(new UnauthorizedException('Invalid credentials'));
		});

		it('should throw unauthorized exception when password is incorrect', async () => {
			const hashedPassword = await hashPassword('deve_ser_hashed_123');

			mockPrismaService.user.findUnique.mockResolvedValue({
				id: 'user-id',
				email: 'test@acme.com',
				password: hashedPassword,
			});

			await expect(
				service.SignIn('test@acme.com', 'senha_errada_123'),
			).rejects.toThrow(new UnauthorizedException('Invalid credentials'));
		});
		it('should throw bad request exception when not pass data', async () => {
			const invalidData = {
				name: '',
				email: '',
				password: '',
				birthDate: new Date(),
				role: 'PATIENT' as ROLE,
				documentType: 'CPF' as DocumentType,
				document: '123.456.789-44',
			};

			await expect(service.SignUp(invalidData)).rejects.toThrow(
				new BadRequestException('Required fields not provided'),
			);
		});
	});
});
