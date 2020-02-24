import { Injectable } from '@angular/core';
import {LoggingService} from "./logging.service";
import {MessageService} from "./message.service";
import {LogLevel} from "../models/types";

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService
{
  private configurationsMap = new Map();

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
    this.messageService.send("");
  }

  public getAllConfigurations(): void
  {

  }

  public addNewConfiguration(): void
  {
    this.messageService.send("");
  }

  public deleteConfiguration(): void
  {
    this.messageService.send("");
  }

  public updateConfiguration(): void
  {
    this.messageService.send("");
  }

  getConfigurationValue(owner: string, key: string): string
  {
    return "";
  }
}
