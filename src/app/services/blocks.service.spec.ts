import { TestBed } from '@angular/core/testing';

import { BlocksService } from './blocks.service';

describe('BlocksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlocksService = TestBed.get(BlocksService);
    expect(service).toBeTruthy();
  });
});
