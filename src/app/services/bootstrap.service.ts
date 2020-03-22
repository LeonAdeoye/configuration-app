import { Injectable } from '@angular/core';
import { LogLevel } from "../models/types";
import { LoggingService } from "./logging.service";
import { IpcRenderer } from "electron";
import { ConfigurationService } from "./configuration.service";
import { Constants } from "../models/constants";

@Injectable({
  providedIn: 'root'
})

export class BootstrapService
{
  private ipcRenderer: IpcRenderer;

  constructor(private loggingService: LoggingService, private configurationService: ConfigurationService)
  {
    this.configurationService.setCurrentUser(Constants.DEFAULT_USER_NAME);
    loggingService.initialize("configuration-app", this.configurationService.getCurrentUser(), Constants.MAX_LOG_SIZE, LogLevel.DEBUG);

    if ((<any>window).require)
    {
      try
      {
        this.ipcRenderer = (<any>window).require('electron').ipcRenderer;
        this.log("Successfully created IPC renderer in Bootstrap service. Service is now ready to receive signals.", LogLevel.DEBUG);

        // This listener is invoked only ONCE after which it is removed.
        this.ipcRenderer.once('browser-ready-signal', () =>
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
    {
      this.log("Unable to create IPC renderer in Bootstrap service.", LogLevel.DEBUG);

      // TODO remove this as it is used only for non-electron debugging from a normal browser when the ng serve command is used.
      if(this.configurationService.getAllConfigurations().length === 0)
        this.configurationService.loadAllConfigurations();

    }
  }

  private log(message: string, logLevel?: LogLevel): void
  {
    this.loggingService.log("BootstrapService", message, logLevel);
  }
}
