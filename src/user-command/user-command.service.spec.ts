import { Test, TestingModule } from '@nestjs/testing';
import { UserCommandService } from './user-command.service';

describe('UserCommandService', () => {
  let service: UserCommandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserCommandService],
    }).compile();

    service = module.get<UserCommandService>(UserCommandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
