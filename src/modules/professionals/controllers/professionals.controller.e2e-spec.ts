import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '@/app.module';

describe('Professionals (E2E)', () => {
	let app: INestApplication;

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleRef.createNestApplication();

		await app.init();
	});

	it('[GET] /professionals', async () => {
		const response = await request(app.getHttpServer()).get(
			'/professionals',
		);

		expect(response.statusCode).toBe(200);
		if (response.body.length > 0) {
			expect(response.body[0]).toHaveProperty('gender');
			expect(response.body[0]).toHaveProperty('document');
			expect(response.body[0]).toHaveProperty('phone');
		}
	});
	it('[GET] /professionals/:id', async () => {});
});
