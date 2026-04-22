import { Test, TestingModule } from '@nestjs/testing';
import { TreatmentTypeController } from '@/infra/http/controllers/treatment-type/treatment-type.controller';

describe.skip('TreatmentTypeController', () => {
  let controller: TreatmentTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TreatmentTypeController],
    }).compile();

    controller = module.get<TreatmentTypeController>(TreatmentTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});



