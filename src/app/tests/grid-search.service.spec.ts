import { TestBed } from '@angular/core/testing';

import { GridSearchService } from '../services/grid-search.service';

describe('GridSearchService', () =>
{
  let service: GridSearchService;

  beforeEach(() =>
  {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GridSearchService);
  });

  it('should be created', () =>
  {
    expect(service).toBeTruthy();
  });
});
