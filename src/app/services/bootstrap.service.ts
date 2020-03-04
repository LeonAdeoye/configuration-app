import { Injectable } from '@angular/core';
import { LogLevel } from "../models/types";
import { LoggingService } from "./logging.service";
import { Subject } from "rxjs";
import { IpcRenderer } from "electron";
import { ConfigurationService } from "./configuration.service";

@Injectable({
  providedIn: 'root'
})

export class BootstrapService
{
  public static bootstrapSubject = new Subject<String>();
  private ipcRenderer: IpcRenderer;

  constructor(private loggingService: LoggingService, private configurationService: ConfigurationService)
  {
    if ((<any>window).require)
    {
      try
      {
        this.ipcRenderer = (<any>window).require('electron').ipcRenderer;
        this.log("Successfully created IPC renderer in Bootstrap service.", LogLevel.DEBUG);

        this.ipcRenderer.on('window-ready-signal', () =>
        {
          this.configurationService.loadAllConfigurations();
        })
      }
      catch (e)
      {
        throw e;
      }
    }
    else
      this.log("Unable to create IPC renderer in Bootstrap service.", LogLevel.DEBUG);
  }

  private log(message: string, logLevel: LogLevel)
  {
    this.loggingService.log("BootstrapService", message, logLevel);
  }
}
