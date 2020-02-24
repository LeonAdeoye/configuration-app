import { Injectable } from '@angular/core';
import { LoggingService } from "./logging.service";
import { MessageService } from "./message.service";
import { LogLevel, MessageMethod, MessageTransport } from "../models/types";
import { Message } from "../models/message";
import { Observable } from "rxjs";
import { Configuration } from "../models/configuration";
import { Constants } from "../models/constants";

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService
{
  private configurationsMap = new Map();
  private configurations: Observable<any>;

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

  public loadAllConfigurations() : any
  {
    let message = new Message(Constants.CONFIGURATION_SERVICE_URL, null, MessageTransport.HTTP, MessageMethod.GET);
    this.messageService.send(message).subscribe((configurations) =>
    {
      for(let index = 0; index < configurations.length; ++index)
      {
        let configuration = configurations[index] as Configuration;
        console.log(`configuration:${JSON.stringify(configuration)}`);
      }
    });
  }

  public getAllConfigurations(): void
  {
    return;
  }

  public addNewConfiguration(): void
  {
    let message = new Message("", "", MessageTransport.HTTP, MessageMethod.GET);
    this.messageService.send(message);
  }

  public deleteConfiguration(): void
  {
    let message = new Message("", "", MessageTransport.HTTP, MessageMethod.DELETE);
    this.messageService.send(message);
  }

  public updateConfiguration(): void
  {
    let message = new Message("", "", MessageTransport.HTTP, MessageMethod.PUT);
    this.messageService.send(message);
  }

  getConfigurationValue(owner: string, key: string): string
  {
    return "";
  }
}
