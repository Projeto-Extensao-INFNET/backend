import { Test, TestingModule } from '@nestjs/testing';
import { TreatmentTypeService } from './treatment-type.service';

describe('TreatmentTypeService', () => {
	let service: TreatmentTypeService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [TreatmentTypeService],
		}).compile();

		service = module.get<TreatmentTypeService>(TreatmentTypeService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
