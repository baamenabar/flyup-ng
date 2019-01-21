import { TestBed } from '@angular/core/testing';

import { FlyupNgLibService } from './flyup-ng-lib.service';

describe('FlyupNgLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlyupNgLibService = TestBed.get(FlyupNgLibService);
    expect(service).toBeTruthy();
  });
});
