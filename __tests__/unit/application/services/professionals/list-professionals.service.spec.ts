import { IProfessionalsRepository } from '@/infra/database/repositories/prisma-professionals.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { ListProfessionalsService } from '@Services/professionals/list-professionals.service';

const mockProfessionalsRepository = {};

describe('ProfessionalService', () => {
  let service: ListProfessionalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListProfessionalsService,
        {
          provide: IProfessionalsRepository,
          useValue: mockProfessionalsRepository,
        },
      ],
    }).compile();

    service = module.get<ListProfessionalsService>(ListProfessionalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // TODO -> criar testes unitários
});
