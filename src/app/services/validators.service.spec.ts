import { TestBed } from '@angular/core/testing';

import { ValidatorsService } from './validators.service';

describe('ValidatorsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidatorsService = TestBed.get(ValidatorsService);
    expect(service).toBeTruthy();
  });
});
