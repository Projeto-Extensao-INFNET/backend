import type { INestApplication } from '@nestjs/common';
import request from 'supertest';

export const makeAuthenticate = async (
	app: INestApplication,
	email: string,
	password = '12345678',
) => {
	const response = await request(app.getHttpServer())
		.post('/auth/signin')
		.send({ email, password });

	return response.body.accessToken;
};
