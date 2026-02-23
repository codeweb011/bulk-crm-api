import { Test, TestingModule } from '@nestjs/testing';
import { BulkActionsController } from './bulk-actions.controller';

describe('BulkActionsController', () => {
  let controller: BulkActionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BulkActionsController],
    }).compile();

    controller = module.get<BulkActionsController>(BulkActionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
