import { Test, TestingModule } from '@nestjs/testing';
import { TreatmentTypeService } from '@Services/treatment-type/treatment-type.service';

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
