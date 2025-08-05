/* 
TODO: TESTES COM JWT

⚠️ IMPORTANTE: ANTES DOS TESTES, PRECISA REFATORAR O user.controller.ts:
   1. Adicionar @UseGuards(JwtAuthGuard) nas rotas GET e DELETE
   2. Criar rotas /me para usuário logado acessar próprios dados
   3. Configurar AuthModule e JwtModule

QUANDO JWT ESTIVER FUNCIONANDO, ADICIONAR ESTES TESTES:

1. TESTES PARA ROTAS PROTEGIDAS:
   - [ ] GET /accounts/:id SEM token → deve dar erro 401
   - [ ] GET /accounts/:id COM token → deve funcionar 200
   - [ ] GET /accounts SEM token → deve dar erro 401  
   - [ ] GET /accounts COM token PATIENT → deve dar erro 403
   - [ ] GET /accounts COM token ADMIN → deve funcionar 200
   - [ ] DELETE /accounts/:id SEM token → deve dar erro 401
   - [ ] DELETE /accounts/:id COM token → deve funcionar 204

2. TESTES PARA ROTAS /me (QUANDO CRIADAS):
   - [ ] GET /accounts/me SEM token → deve dar erro 401
   - [ ] GET /accounts/me COM token → deve retornar dados do usuário
   - [ ] DELETE /accounts/me SEM token → deve dar erro 401
   - [ ] DELETE /accounts/me COM token → deve deletar própria conta

  HELPER FUNCTION PARA LOGIN:
   ```typescript
   async function loginAndGetToken(app, email, password) {
     const response = await request(app.getHttpServer())
       .post('/auth/login')
       .send({ email, password });
     return response.body.access_token;
   }
   ```

3. EXEMPLO DE TESTE COM TOKEN:
   ```typescript
   it('should return 401 without token', async () => {
     const response = await request(app.getHttpServer())
       .get('/accounts/some-id');
     expect(response.status).toBe(401);
   });
   ```

RESUMO: Manter testes atuais + Adicionar versões com/sem token
*/

import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '@/app.module';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { hashPassword } from '@/utils';

describe('Create account (E2E)', () => {
	let app: INestApplication;
	let prisma: PrismaService;

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleRef.createNestApplication();

		prisma = moduleRef.get(PrismaService);

		await app.init();
	});

	it('[POST] /accounts', async () => {
		const response = await request(app.getHttpServer())
			.post('/accounts')
			.send({
				name: 'João da Silva',
				email: 'joaoSilva@email.com',
				password: await hashPassword('12345678'),
				role: 'ADMIN',
				birthDate: '2005-09-26',
				documentType: 'RG',
				document: '99.999.999.9',
			});

		const userOnDatabase = await prisma.user.findUnique({
			where: {
				email: 'joaoSilva@email.com',
			},
		});

		expect(response.statusCode).toBe(201);
		expect(userOnDatabase).toBeTruthy();
	});

	it('[POST] /accounts - should throw error with user email already exists', async () => {
		await request(app.getHttpServer())
			.post('/accounts')
			.send({
				name: 'Usuário Test III',
				email: 'test@email.com',
				password: await hashPassword('12345678'),
				role: 'ADMIN',
				birthDate: '2005-09-26',
				documentType: 'RG',
				document: '22.222.222.2',
			});

		const response = await request(app.getHttpServer())
			.post('/accounts')
			.send({
				name: 'Usuário Test IV',
				email: 'test@email.com',
				password: await hashPassword('12345678'),
				role: 'ADMIN',
				birthDate: '2001-09-11',
				documentType: 'RG',
				document: '22.222.222.2',
			});

		expect(response.statusCode).toBe(409);
		expect(response.body).toHaveProperty(
			'message',
			'Usuário com o mesmo email já existe',
		);
	});
	it('[POST] /accounts - should throw error with user document already exists', async () => {
		await request(app.getHttpServer())
			.post('/accounts')
			.send({
				name: 'Usuário Test I',
				email: 'duplicateDocumentTestI@email.com',
				password: await hashPassword('12345678'),
				role: 'ADMIN',
				birthDate: '2005-09-26',
				documentType: 'RG',
				document: '11.111.111.1',
			});

		const response = await request(app.getHttpServer())
			.post('/accounts')
			.send({
				name: 'Usuário Test II',
				email: 'duplicateDocumentTestII@email.com',
				password: await hashPassword('12345678'),
				role: 'ADMIN',
				birthDate: '2001-09-11',
				documentType: 'RG',
				document: '11.111.111.1',
			});

		expect(response.statusCode).toBe(409);
		expect(response.body).toHaveProperty(
			'message',
			'Usuário com o mesmo documento já existe',
		);
	});

	it('[GET] /accounts/:id', async () => {
		const createUser = await request(app.getHttpServer())
			.post('/accounts')
			.send({
				name: 'Chaves',
				email: 'chavinho@email.com',
				password: await hashPassword('12345678'),
				role: 'ADMIN',
				birthDate: '2005-09-26',
				documentType: 'RG',
				document: '88.888.888.8',
			});

		const userId = createUser.body.id;

		const response = await request(app.getHttpServer()).get(
			`/accounts/${userId}`,
		);

		expect(response.statusCode).toBe(200);
		expect(response.body).toBeDefined();
		expect(response.body).toMatchObject({
			name: 'Chaves',
			email: 'chavinho@email.com',
			document: '88.888.888.8',
		});
	});

	it('[GET] /accounts/:id - should return 404 for non-existing user', async () => {
		const fakeUserId = '0000000000000000-00000000';

		const response = await request(app.getHttpServer()).get(
			`/accounts/${fakeUserId}`,
		);

		expect(response.statusCode).toBe(404);
		expect(response.body).toHaveProperty(
			'message',
			'Usuário não encontrado',
		);
	});
	it('[GET] /accounts', async () => {
		const response = await request(app.getHttpServer()).get('/accounts');

		expect(response.body).toBeInstanceOf(Array);
		expect(response.body[0]).toHaveProperty('name');
		expect(response.body[0]).toHaveProperty('email');
		expect(response.body[0]).toHaveProperty('role');
	});
	it('[DELETE] /accounts/:id', async () => {
		const createUser = await request(app.getHttpServer())
			.post('/accounts')
			.send({
				name: 'Kiko',
				email: 'tesouro@email.com',
				password: await hashPassword('12345678'),
				role: 'PATIENT',
				birthDate: '2005-09-26',
				documentType: 'CPF',
				document: '200.300.400.00',
			});

		const userId = createUser.body.id;

		const response = await request(app.getHttpServer()).delete(
			`/accounts/${userId}`,
		);

		expect(response.statusCode).toBe(204);
	});
});
