import { TestBed } from '@angular/core/testing';

import { TxsService } from './txs.service';

describe('TxsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TxsService = TestBed.get(TxsService);
    expect(service).toBeTruthy();
  });
});
