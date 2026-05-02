import { IProfessionalsRepository } from '@/infra/database/prisma/repositories/prisma-professionals.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { ProfessionalsService } from '@Services/professionals/professionals.service';

const mockProfessionalsRepository = {};

describe.skip('ProfessionalService', () => {
  let service: ProfessionalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfessionalsService,
        {
          provide: IProfessionalsRepository,
          useValue: mockProfessionalsRepository,
        },
      ],
    }).compile();

    service = module.get<ProfessionalsService>(ProfessionalsService);
  });

  describe('Service', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe(`${ProfessionalsService.prototype.listProfessionals.name}`, () => {
    it.todo('', () => {});
  });

  // TODO -> criar testes unitários
});
