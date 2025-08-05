import { Test, TestingModule } from '@nestjs/testing';
import { TreatmentTypeController } from './treatment-type.controller';

describe('TreatmentTypeController', () => {
	let controller: TreatmentTypeController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [TreatmentTypeController],
		}).compile();

		controller = module.get<TreatmentTypeController>(
			TreatmentTypeController,
		);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
