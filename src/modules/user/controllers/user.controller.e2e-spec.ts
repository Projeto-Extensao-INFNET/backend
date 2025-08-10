import { faker } from '@faker-js/faker/locale/pt_BR';
import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '@/app.module';
import { DocumentType, ROLE } from '../dto/get-user.dto';

describe('User (E2E)', () => {
	let app: INestApplication;

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleRef.createNestApplication();

		await app.init();
	});

	it('[DELETE] /accounts/me', async () => {
		const fakeEmail = faker.internet.email();
		const fakeDocument = faker.helpers.replaceSymbols('###.###.###-##');

		const SignUpResponse = await request(app.getHttpServer())
			.post('/auth/signup')
			.send({
				name: 'Kiko',
				email: fakeEmail,
				password: '12345678',
				role: ROLE.PATIENT,
				birthDate: new Date(),
				documentType: DocumentType.CPF,
				document: fakeDocument,
			});

		const signInResponse = await request(app.getHttpServer())
			.post('/auth/signin')
			.send({
				email: fakeEmail,
				password: '12345678',
			});

		const token = signInResponse.body.accessToken;

		const userExists = await request(app.getHttpServer())
			.get('/accounts/me')
			.set('Authorization', `Bearer ${token}`);

		const deleteUser = await request(app.getHttpServer())
			.delete('/accounts/me')
			.set('Authorization', `Bearer ${token}`);

		const isUserDeleted = await request(app.getHttpServer())
			.get('/accounts/me')
			.set('Authorization', `Bearer ${token}`);

		expect(SignUpResponse.statusCode).toBe(201);
		expect(signInResponse.statusCode).toBe(201);
		expect(signInResponse.body).toHaveProperty('accessToken');
		expect(userExists.statusCode).toBe(200);
		expect(deleteUser.statusCode).toBe(204);
		expect(isUserDeleted.statusCode).toBe(404);
	});
});
