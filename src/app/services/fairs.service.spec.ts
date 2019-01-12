import { TestBed } from '@angular/core/testing';

import { FairsService } from './fairs.service';

describe('FairsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FairsService = TestBed.get(FairsService);
    expect(service).toBeTruthy();
  });
});
