import { TestBed } from '@angular/core/testing';

import { GovService } from './gov.service';

describe('GovService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GovService = TestBed.get(GovService);
    expect(service).toBeTruthy();
  });
});
