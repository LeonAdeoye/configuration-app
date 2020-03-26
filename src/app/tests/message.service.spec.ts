import { TestBed } from '@angular/core/testing';
import { MessageService } from '../services/message.service';
import { ConfigurationService } from "../services/configuration.service";
import { LoggingService } from "../services/logging.service";
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { HttpClientModule } from "@angular/common/http";

describe('MessageService', () =>
{
  let messageService: MessageService;
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
          HttpClientTestingModule,
          HttpClientModule
        ],
      providers:
        [
          { provide: ConfigurationService, useValue: spyConfigurationService },
          { provide: LoggingService, useValue: spyLoggingService }
        ]
    });
    messageService = TestBed.inject(MessageService);
  });

  it('should be created', () =>
  {
    expect(messageService).toBeTruthy();
  });
});
