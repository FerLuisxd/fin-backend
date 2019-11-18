import { Test, TestingModule } from '@nestjs/testing';
import { EndorsmentController } from './endorsment.controller';

describe('Endorsment Controller', () => {
  let controller: EndorsmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EndorsmentController],
    }).compile();

    controller = module.get<EndorsmentController>(EndorsmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
