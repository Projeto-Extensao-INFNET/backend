import { faker } from '@faker-js/faker/locale/pt_BR';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import type { DocumentType, ROLE } from '@/_types';
import { InMemoryUserRepository } from '../repositories/in-memory/in-memory-user.repository';
import { UserRepository } from '../repositories/user.repository';
import { UserService } from './user.service';

describe('UserService', () => {
	let service: UserService;
	let inMemoryUserRepository: InMemoryUserRepository; // instancio o repositório em memória de usuários

	const nonExistentUserId = 'non-existent-id'; // id para testes que devem retornar erros
	const userId = 'user-id-123'; // id para testes de sucesso

	const mockUser = {
		id: userId,
		name: faker.person.fullName(),
		email: faker.internet.email(),
		password: '123455678',
		birthDate: new Date(),
		role: 'PATIENT' as ROLE,
		documentType: 'CPF' as DocumentType,
		document: faker.helpers.replaceSymbols('###.###.###-##'),
		createdAt: new Date(),
		updatedAt: new Date(),
	}; // mock de um usuário

	beforeEach(async () => {
		inMemoryUserRepository = new InMemoryUserRepository(); // injeto o repositório em memória de usuários

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserService,
				{
					provide: UserRepository,
					useValue: inMemoryUserRepository, // usa a instância como provider
				},
			],
		}).compile();

		service = module.get<UserService>(UserService);
	});

	afterEach(() => {
		inMemoryUserRepository.items = []; // Limpa o array após cada teste
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('getProfile', () => {
		it('should get user profile', async () => {
			inMemoryUserRepository.items.push(mockUser);

			const result = await service.getProfile(userId);

			expect(result).not.toHaveProperty('password');
			expect(result.id).toBe(userId);
		});
		it('it should throw NotFoundException when user not found', async () => {
			await expect(service.getProfile(nonExistentUserId)).rejects.toThrow(
				new NotFoundException('User not found'),
			);
		});
	});
	describe('deleteAccount ', () => {
		it('should delete user profile', async () => {
			inMemoryUserRepository.items.push(mockUser);

			await service.deleteAccount(userId);

			expect(
				inMemoryUserRepository.items.find((user) => user.id === userId),
			).toBeUndefined();
		});

		it('it should throw NotFoundException when user not found', async () => {
			await expect(
				service.deleteAccount(nonExistentUserId),
			).rejects.toThrow(new NotFoundException('User not found'));
		});
	});
	describe('createAppointment', () => {});
	describe('getAppointments', () => {});
	describe('changeAppointment', () => {});
	describe('cancelAppointment', () => {});
});
