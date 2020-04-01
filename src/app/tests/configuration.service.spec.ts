import { TestBed, inject} from '@angular/core/testing';
import { ConfigurationService } from '../services/configuration.service';
import { LoggingService } from "../services/logging.service";
import { MessageService } from "../services/message.service";
import { Configuration } from "../models/configuration";
import { Subject } from "rxjs";
import { MessageServiceMock } from "./mock-message.service";
import { Message } from "../models/message";
import { Constants } from "../models/constants";
import { MessageMethod, MessageTransport } from "../models/types";


describe('ConfigurationService', () =>
{
  let configurationService: ConfigurationService;
  const spyLoggingService = jasmine.createSpyObj('LoggingService', ['log']);

  beforeEach(() =>
  {
    TestBed.configureTestingModule({
      providers:
      [
        { provide: MessageService, useClass: MessageServiceMock },
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
    it('should call message service send', inject([MessageService, ConfigurationService], (messageService, configurationService) =>
    {
      // Arrange
      let configuration = new Configuration();
      spyOn(messageService, 'send').and.returnValues(new Subject());
      // Act
      configurationService.saveConfiguration(configuration);
      // Assert
      expect(messageService.send).toHaveBeenCalledWith(jasmine.any(Message));
    }));
  });

  describe('deleteConfiguration', () =>
  {
    it('should call message service send', inject([MessageService, ConfigurationService], (messageService, configurationService) =>
    {
      // Arrange
      let message = new Message(`${Constants.CONFIGURATION_SERVICE_URL_BASE}/configuration?id=2012-12-23`, null, MessageTransport.HTTP, MessageMethod.DELETE);
      spyOn(messageService, 'send').and.returnValues(new Subject());
      // Act
      configurationService.deleteConfiguration('2012-12-23');
      // Assert
      expect(messageService.send).toHaveBeenCalledWith(message);
    }));
  });

  describe('loadAllConfigurations', () =>
  {
    it('should call message service send', inject([MessageService, ConfigurationService], (messageService, configurationService) =>
    {
      // Arrange
      let subject = new Subject();
      let message = new Message(`${Constants.CONFIGURATION_SERVICE_URL_BASE}/configurations`, null, MessageTransport.HTTP, MessageMethod.GET);
      spyOn(messageService, 'send').and.returnValues(subject);
      // Act
      configurationService.loadAllConfigurations();
      // Assert
      expect(messageService.send).toHaveBeenCalledWith(message);
    }));
  });

});


