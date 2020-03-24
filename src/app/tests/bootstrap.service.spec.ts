import { TestBed } from '@angular/core/testing';

import { BootstrapService } from '../services/bootstrap.service';
import { AppComponent } from "../app.component";
import { HttpClientModule } from "@angular/common/http";
import { ConfigurationService } from "../services/configuration.service";
import { LoggingService } from "../services/logging.service";

describe('BootstrapService', () =>
{
  let service: BootstrapService;
  const spyConfigurationService = jasmine.createSpyObj('ConfigurationService', ['loadAllConfigurations']);
  const spyLoggingService = jasmine.createSpyObj('LoggingService', ['log']);

  beforeEach(() =>
  {
    TestBed.configureTestingModule({
      declarations:
      [
      ],
      imports:
      [
      ],
      providers:
      [
        { provide: ConfigurationService, useClass: spyConfigurationService },
        { provide: LoggingService, useClass: spyLoggingService }
      ]

    }).compileComponents();

    service = TestBed.inject(BootstrapService);
  });

  it('should be created', () =>
  {
    expect(service).toBeTruthy();
  });
});
