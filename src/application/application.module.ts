/*
 AGREGA A CAMADA DE APPLICATION (SERVICES) E CARREGA A DE INFRA (HTTP CONTROLLERS)
*/

import { Module } from '@nestjs/common';
import { HttpModule } from '@/infra/http/http.module';
@Module({
	imports: [HttpModule],
	exports: [],
})
export class ApplicationModule {}
