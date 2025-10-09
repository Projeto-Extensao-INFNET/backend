import { Module } from '@nestjs/common';
import { HttpModule } from '@/infra/http/http.module';

@Module({
	imports: [HttpModule],
	exports: [],
})
export class ApplicationModule {}
