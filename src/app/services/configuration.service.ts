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
  public serviceUpdateSubject = new Subject<ServiceUpdate>();
  public editConfigurationSubject = new Subject<Configuration>();
  public cloneConfigurationSubject = new Subject<Configuration>();
  public addConfigurationSubject = new Subject();

  constructor(private loggingService: LoggingService, private messageService: MessageService)
  {
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
          this.log(`Configurations details: ${JSON.stringify(configurations)}`, LogLevel.INFO);
          this.serviceUpdateSubject.next(ServiceUpdate.REFRESH);
        }
        catch(err)
        {
          this.log(err.message, LogLevel.ERROR);
        }
    },
    (error) =>
    {
      if(error)
        this.log(`${error.message}`, LogLevel.ERROR);
    });
  }

  public getAllConfigurations(): Array<Configuration>
  {
    return this.configurations;
  }

  public addNewConfiguration(owner: string, key: string, value: string): void
  {
    this.log(`Adding new configuration: {"owner": ${owner} "key": ${key}, "value": ${value}}`, LogLevel.DEBUG);
    let message = new Message(`${Constants.CONFIGURATION_SERVICE_URL_BASE}/configuration`, `{"owner": "${owner}", "key": "${key}", "value": "${value}"}`, MessageTransport.HTTP, MessageMethod.POST);
    this.messageService.send(message).subscribe(
      (result) =>
    {
      if(result)
        this.log(`result: ${result}`, LogLevel.DEBUG);
      this.loadAllConfigurations();
    },
    (error) =>
    {
      if(error)
        this.log(`${error.message}`, LogLevel.ERROR);
    });
  }

  public deleteConfiguration(configurationId: string): void
  {
    let message = new Message(`${Constants.CONFIGURATION_SERVICE_URL_BASE}/configuration?id=${configurationId}`, null, MessageTransport.HTTP, MessageMethod.DELETE);
    this.messageService.send(message).subscribe(
      (result) =>
      {
        if(result)
          this.log(`result: ${result}`, LogLevel.DEBUG);
        this.loadAllConfigurations();
      },
      (error) =>
      {
        if(error)
          this.log(`${error.message}`, LogLevel.ERROR);
      });
  }

  public editConfiguration(owner: string, key: string, value: string): void
  {
    this.log(`Editing exist configuration: {"owner": ${owner} "key": ${key}, "value": ${value}}`, LogLevel.DEBUG);
    let message = new Message(`${Constants.CONFIGURATION_SERVICE_URL_BASE}/configuration`, `{"owner": "${owner}", "key": "${key}", "value": ${value}}`, MessageTransport.HTTP, MessageMethod.PUT);
    this.messageService.send(message).subscribe(
      (result) =>
      {
        if(result)
          this.log(`result: ${result}`, LogLevel.DEBUG);
        this.loadAllConfigurations();
      },
      (error) =>
      {
        if(error)
          this.log(`${error.message}`, LogLevel.ERROR);
      });
  }

  getConfigurationValue(owner: string, key: string): string
  {
    for(let index = 0; index < this.configurations.length; ++index)
    {
      if(this.configurations[index].owner === owner && this.configurations[index].key === key)
        return this.configurations[index].value;
    }

    return "";
  }
}
