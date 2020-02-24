import { Injectable } from '@angular/core';
import { LoggingService } from "./logging.service";
import { MessageService } from "./message.service";
import { LogLevel, MessageMethod, MessageTransport } from "../models/types";
import { Message } from "../models/message";
import { Constants } from "../models/constants";
import { Configuration } from "../models/configuration";

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService
{
  private configurations = Array<Configuration>();

  constructor(private loggingService: LoggingService, private messageService: MessageService)
  {
  }

  private log(message: string, logLevel: LogLevel)
  {
    this.loggingService.log("ConfigurationService", message, logLevel);
  }

  private cacheAllConfigurations(): void
  {

  }

  public loadAllConfigurations() : void
  {
    let message = new Message(`${Constants.CONFIGURATION_SERVICE_URL_BASE}/configurations`, null, MessageTransport.HTTP, MessageMethod.GET);
    this.messageService.send(message).subscribe((configurations) =>
    {
        try
        {
          for(let index = 0; index < configurations.length; ++index)
            this.configurations.push(Configuration.deserialize(configurations[index]));
        }
        catch(err)
        {
          this.log(err.message, LogLevel.ERROR);
        }
    });
  }

  public getAllConfigurations(): Array<Configuration>
  {
    return this.configurations;
  }

  public addNewConfiguration(): void
  {
    let message = new Message(`${Constants.CONFIGURATION_SERVICE_URL_BASE}/configuration`, null, MessageTransport.HTTP, MessageMethod.POST);
    this.messageService.send(message);
  }

  public deleteConfiguration(): void
  {
    let message = new Message(`${Constants.CONFIGURATION_SERVICE_URL_BASE}/configuration`, null, MessageTransport.HTTP, MessageMethod.DELETE);
    this.messageService.send(message);
  }

  public updateConfiguration(): void
  {
    let message = new Message(`${Constants.CONFIGURATION_SERVICE_URL_BASE}/configuration`, null, MessageTransport.HTTP, MessageMethod.PUT);
    this.messageService.send(message);
  }

  getConfigurationValue(owner: string, key: string): string
  {
    return "";
  }
}
