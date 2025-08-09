import { faker } from '@faker-js/faker/locale/pt_BR';
import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '@/app.module';

describe('AuthController (E2E)', () => {
	let app: INestApplication;

	const generateUniqueEmail = () => faker.internet.email();
	const generateUniqueDocument = () =>
		faker.helpers.replaceSymbols('##.###.###-##');

	const createValidUserData = () => ({
		name: 'Usuário Teste',
		email: generateUniqueEmail(),
		password: '12345678',
		role: 'PATIENT' as const,
		birthDate: '2005-09-26T00:00:00.000Z',
		documentType: 'CPF' as const,
		document: generateUniqueDocument(),
	});

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleRef.createNestApplication();

		await app.init();
	});

	afterAll(async () => {
		await app.close();
	});

	it('should be defined', () => {
		expect(app).toBeDefined();
	});

	describe('Success Cases - Happy Path', () => {
		it('[POST] /auth/signup - should create a new user successfully', async () => {
			const userData = createValidUserData();

			const response = await request(app.getHttpServer())
				.post('/auth/signup')
				.send(userData);

			expect(response.statusCode).toBe(201);
			expect(response.body).toHaveProperty('id');
			expect(response.body).toHaveProperty('email', userData.email);
			expect(response.body).not.toHaveProperty('password');
		});

		it('[POST] /auth/signin - should return access token with valid credentials', async () => {
			const userData = createValidUserData();

			const signUpResponse = await request(app.getHttpServer())
				.post('/auth/signup')
				.send(userData);

			const signinResponse = await request(app.getHttpServer())
				.post('/auth/signin')
				.send({
					email: userData.email,
					password: userData.password,
				});

			expect(signUpResponse.statusCode).toBe(201);
			expect(signinResponse.statusCode).toBe(201);
			expect(signinResponse.body).toHaveProperty('accessToken');
			expect(typeof signinResponse.body.accessToken).toBe('string');
		});

		it('Complete flow: signup then signin', async () => {
			const userData = createValidUserData();

			const signUpResponse = await request(app.getHttpServer())
				.post('/auth/signup')
				.send(userData);

			const signinResponse = await request(app.getHttpServer())
				.post('/auth/signin')
				.send({
					email: userData.email,
					password: userData.password,
				});

			expect(signUpResponse.statusCode).toBe(201);
			expect(signinResponse.statusCode).toBe(201);
			expect(signinResponse.body).toHaveProperty('accessToken');
		});
	});

	describe('Business Logic Errors', () => {
		it('[POST] /auth/signup - should return 409 when email already exists', async () => {
			const userData = createValidUserData();

			await request(app.getHttpServer())
				.post('/auth/signup')
				.send(userData);

			const duplicateEmailData = {
				...userData,
				document: generateUniqueDocument(),
			};

			const response = await request(app.getHttpServer())
				.post('/auth/signup')
				.send(duplicateEmailData);

			expect(response.statusCode).toBe(409);
			expect(response.body).toHaveProperty(
				'message',
				'Credenciais já estão em uso',
			);
		});

		it('[POST] /auth/signin - should return 401 with invalid email', async () => {
			const signinResponse = await request(app.getHttpServer())
				.post('/auth/signin')
				.send({
					email: 'deve_falhar@acme.com',
					password: '12345678',
				});

			expect(signinResponse.statusCode).toBe(401);
			expect(signinResponse.body).toHaveProperty(
				'message',
				'Credenciais inválidas',
			);
		});

		it('[POST] /auth/signin - should return 401 with invalid password', async () => {
			const userData = createValidUserData();

			await request(app.getHttpServer())
				.post('/auth/signup')
				.send(userData);

			const signinResponse = await request(app.getHttpServer())
				.post('/auth/signin')
				.send({
					email: userData.email,
					password: 'deve_falhar_123',
				});

			expect(signinResponse.statusCode).toBe(401);
			expect(signinResponse.body).toHaveProperty(
				'message',
				'Credenciais inválidas',
			);
		});
	});

	describe('Input Validation', () => {
		// !! FIX corrigir DTOs para validação correta de email
		// it('[POST] /auth/signup - should return 400 with invalid email format', async () => {
		// 	const userData = createValidUserData();

		// 	const signUpResponse = await request(app.getHttpServer())
		// 		.post('/auth/signup')
		// 		.send({
		// 			...userData,
		// 			email: 'emailFalha.com',
		// 		});

		// 	expect([400, 500]).toContain(signUpResponse.statusCode);
		// });

		it('[POST] /auth/signup - should return 400 with missing required fields', async () => {
			const signUpResponse = await request(app.getHttpServer())
				.post('/auth/signup')
				.send({ name: 'Teste' });

			expect(signUpResponse.statusCode).toBe(400);
			expect(signUpResponse.body).toHaveProperty(
				'message',
				'Campos obrigatórios não fornecidos',
			);
		});
	});
});
