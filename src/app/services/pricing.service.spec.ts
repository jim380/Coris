import { TestBed } from '@angular/core/testing';

import { PricingService } from './pricing.service';

describe('PricingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PricingService = TestBed.get(PricingService);
    expect(service).toBeTruthy();
  });
});
