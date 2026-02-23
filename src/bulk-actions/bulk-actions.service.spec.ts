import { Test, TestingModule } from '@nestjs/testing';
import { BulkActionsService } from './bulk-actions.service';

describe('BulkActionsService', () => {
  let service: BulkActionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BulkActionsService],
    }).compile();

    service = module.get<BulkActionsService>(BulkActionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
