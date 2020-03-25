import { TestBed } from '@angular/core/testing';

import { ConfigurationService } from '../services/configuration.service';
import { LoggingService } from "../services/logging.service";
import { MessageService } from "../services/message.service";

describe('ConfigurationService', () =>
{
  let configurationService: ConfigurationService;
  const spyMessageService = jasmine.createSpyObj('MessageService', ['send']);
  const spyLoggingService = jasmine.createSpyObj('LoggingService', ['log']);

  beforeEach(() =>
  {
    TestBed.configureTestingModule({
      providers:
        [
          { provide: MessageService, useValue: spyMessageService },
          { provide: LoggingService, useValue: spyLoggingService }
        ]
    }).compileComponents();

    configurationService = TestBed.inject(ConfigurationService);
  });

  it('should be created', () =>
  {
    expect(configurationService).toBeTruthy();
  });
});
