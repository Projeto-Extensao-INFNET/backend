import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '@services/user.service';
import { PrismaService } from '@/database/prisma/prisma.service';
import { PrismaUserRepository } from '@/database/repositories/prisma/prisma-user-repository';
import { UserRepository } from '@/database/repositories/user.repository';
import {
	generateBirthDate,
	generateUniqueDocument,
	generateUniqueEmail,
	generateUniqueName,
	generateUUID,
	nonExistentUserId,
} from '@/shared/utils';
import { MockPrismaService } from '@/test/mocks/prisma';

describe('UserService', () => {
	let service: UserService;
	const mockPrismaService = MockPrismaService();

	const userMock = {
		id: generateUUID(),
		name: generateUniqueName(),
		email: generateUniqueEmail(),
		password: '12345678',
		birthDate: generateBirthDate(),
		role: 'PATIENT',
		documentType: 'CPF',
		document: generateUniqueDocument(),
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserService,
				{
					provide: UserRepository,
					useClass: PrismaUserRepository,
				},
				{
					provide: PrismaService,
					useValue: mockPrismaService,
				},
			],
		}).compile();

		service = module.get<UserService>(UserService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('getProfile', () => {
		it('should get user profile', async () => {
			const user = userMock;

			mockPrismaService.user.findUnique.mockResolvedValue(userMock);

			const result = await service.getProfile(user.id);

			expect(result).not.toHaveProperty('password');
			expect(result.id).toBe(user.id);
		});

		it('it should throw NotFoundException when user not found', async () => {
			mockPrismaService.user.findUnique.mockResolvedValue(null);

			await expect(service.getProfile(nonExistentUserId)).rejects.toThrow(
				new NotFoundException('User not found'),
			);
		});
	});

	describe('deleteAccount ', () => {
		it('should delete user profile', async () => {
			const user = userMock;

			mockPrismaService.user.delete.mockResolvedValue(user);

			mockPrismaService.user.findUnique
				.mockResolvedValueOnce(user) // 1ª chamada: retorna o usuário
				.mockResolvedValueOnce(null); // 2ª chamada: retorna null

			await service.deleteAccount(user.id);

			const result = await mockPrismaService.user.findUnique({
				where: {
					id: user.id,
				},
			});

			expect(result).toBeNull();
		});

		it('it should throw NotFoundException when user not found', async () => {
			mockPrismaService.user.delete.mockRejectedValue(
				new NotFoundException('User not found'),
			);

			await expect(
				service.deleteAccount(nonExistentUserId),
			).rejects.toThrow(new NotFoundException('User not found'));
		});
	});

	describe('editProfile', () => {
		it('should edit user profile', async () => {
			const user = userMock;
			const dto = { name: 'Novo nome', email: 'novo@email.com' }; // dados que serão usados na edição do perfil

			// primeiro valida se o usuario existe
			mockPrismaService.user.findUnique.mockResolvedValue(user);

			// simula o retorno do update
			mockPrismaService.user.update.mockResolvedValue({
				...user,
				...dto,
			});

			// executa o método de editProfile no service
			const result = await service.editProfile(user.id, dto);

			// verifica se o update foi chamado com os dados corretos (vindos do DTO)
			expect(mockPrismaService.user.update).toHaveBeenCalledWith({
				where: { id: user.id },
				data: dto,
			});
			expect(result).not.toHaveProperty('password'); // verifica se a senha do usuário não aparece no retorno
			expect(result.name).toBe(dto.name); // verifica se o novo campo editado aparece corretamente
			expect(result.email).toBe(dto.email); // verifica se o novo campo editado aparece corretamente
		});
	});

	// describe('createAppointment', () => {});
	// describe('getAppointments', () => {});
	// describe('changeAppointment', () => {});
	// describe('cancelAppointment', () => {});
});
