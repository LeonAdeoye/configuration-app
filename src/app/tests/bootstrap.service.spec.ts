import { fakeAsync, TestBed } from '@angular/core/testing';
import { BootstrapService } from '../services/bootstrap.service';
import { ConfigurationService } from "../services/configuration.service";
import { LoggingService } from "../services/logging.service";

describe('BootstrapService', () =>
{
  let bootstrapService: BootstrapService;
  const spyConfigurationService = jasmine.createSpyObj('ConfigurationService', ['loadAllConfigurations', 'getAllConfigurations','setCurrentUser', 'getCurrentUser']);
  const spyLoggingService = jasmine.createSpyObj('LoggingService', ['log', 'initialize']);
  spyConfigurationService.getAllConfigurations.and.returnValue([]);

  beforeEach(() =>
  {
    TestBed.configureTestingModule({
      providers:
      [
        { provide: ConfigurationService, useValue: spyConfigurationService },
        { provide: LoggingService, useValue: spyLoggingService }
      ]
    }).compileComponents();

    bootstrapService = TestBed.inject(BootstrapService);

  });


  it('should be created', () =>
  {
    expect(bootstrapService).toBeTruthy();
  });
});
