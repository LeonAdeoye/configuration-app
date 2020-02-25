import { Injectable } from '@angular/core';
import { LoggingService } from "./logging.service";
import { MessageService } from "./message.service";
import { LogLevel, MessageMethod, MessageTransport, ServiceUpdate } from "../models/types";
import { Message } from "../models/message";
import { Constants } from "../models/constants";
import { Configuration } from "../models/configuration";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService
{
  private configurations = Array<Configuration>();
  public serviceUpdate: Subject<ServiceUpdate>;

  constructor(private loggingService: LoggingService, private messageService: MessageService)
  {
    this.serviceUpdate = new Subject<ServiceUpdate>();
  }

  private log(message: string, logLevel: LogLevel)
  {
    this.loggingService.log("ConfigurationService", message, logLevel);
  }

  public loadAllConfigurations() : void
  {
    let message = new Message(`${Constants.CONFIGURATION_SERVICE_URL_BASE}/configurations`, null, MessageTransport.HTTP, MessageMethod.GET);
    this.messageService.send(message).subscribe((configurations) =>
    {
        try
        {
          this.configurations = Configuration.deserializeArray(configurations);
          this.log(`Retrieved ${configurations.length} configurations from the configuration micro-service.`, LogLevel.INFO);
          this.serviceUpdate.next(ServiceUpdate.REFRESH);
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
    for(let index = 0; index < this.configurations.length; ++index)
    {
      if(this.configurations[index].getOwner() === owner && this.configurations[index].getKey() === key)
        return this.configurations[index].getValue();
    }

    return "";
  }
}
