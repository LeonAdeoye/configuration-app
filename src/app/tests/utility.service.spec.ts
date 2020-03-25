import { TestBed } from '@angular/core/testing';

import { UtilityService } from '../services/utility.service';

describe('UtilityService', () =>
{
  let utilityService: UtilityService;

  beforeEach(() =>
  {
    TestBed.configureTestingModule({});
    utilityService = TestBed.inject(UtilityService);
  });

  it('should be created', () =>
  {
    expect(utilityService).toBeTruthy();
  });
});
