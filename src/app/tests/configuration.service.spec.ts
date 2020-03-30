import { TestBed, inject} from '@angular/core/testing';

import { ConfigurationService } from '../services/configuration.service';
import { LoggingService } from "../services/logging.service";
import { MessageService } from "../services/message.service";
import { Configuration } from "../models/configuration";

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

  describe('setCurrentUser', () =>
  {
    it('should set the current user', () =>
    {
      // Act
      configurationService.setCurrentUser("Horatio");
      // Assert
      expect(configurationService.getCurrentUser()).toBe("Horatio");
    });
  });

  describe('saveConfiguration', () =>
  {
    it('should set the current user', inject([MessageService], (messageService) =>
    {
      // Arrange
      let configuration = new Configuration();
      // Act
      configurationService.saveConfiguration(configuration);
      // Assert
      expect(messageService.send).toHaveBeenCalled();
    }));
  });
});


