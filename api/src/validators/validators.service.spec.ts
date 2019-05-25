import { Test, TestingModule } from '@nestjs/testing';
import { ValidatorsService } from './validators.service';

describe('ValidatorsService', () => {
  let service: ValidatorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidatorsService],
    }).compile();

    service = module.get<ValidatorsService>(ValidatorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
