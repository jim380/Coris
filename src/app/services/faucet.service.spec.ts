import { TestBed } from '@angular/core/testing';

import { FaucetService } from './faucet.service';

describe('FaucetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FaucetService = TestBed.get(FaucetService);
    expect(service).toBeTruthy();
  });
});
