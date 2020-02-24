import { TestBed } from '@angular/core/testing';

import { BootstrapService } from '../services/bootstrap.service';

describe('BootstrapService', () => {
  let service: BootstrapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BootstrapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
