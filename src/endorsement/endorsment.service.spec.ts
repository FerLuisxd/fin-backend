import { Test, TestingModule } from '@nestjs/testing';
import { EndorsmentService } from './endorsment.service';

describe('EndorsmentService', () => {
  let service: EndorsmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EndorsmentService],
    }).compile();

    service = module.get<EndorsmentService>(EndorsmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
