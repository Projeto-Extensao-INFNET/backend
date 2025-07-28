import {
	Inject,
	Injectable,
	type OnModuleDestroy,
	type OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from 'generated/prisma';
import type { Env } from '@/config/env';

@Injectable()
export class PrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	constructor(
		@Inject(ConfigService) configService: ConfigService<Env, true>,
	) {
		super({
			log:
				configService.get('NODE_ENV', { infer: true }) === 'development'
					? ['query', 'error', 'warn']
					: ['error'],
		});
	}
	onModuleInit() {
		return this.$connect();
	}
	onModuleDestroy() {
		return this.$disconnect();
	}
}
