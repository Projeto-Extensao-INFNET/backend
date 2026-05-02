import { Test, TestingModule } from '@nestjs/testing';
import { LogoutController } from '@/presentation/controllers/auth/logout.controller';

describe.skip('LogoutController', () => {
  let controller: LogoutController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogoutController],
    }).compile();

    controller = module.get<LogoutController>(LogoutController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
