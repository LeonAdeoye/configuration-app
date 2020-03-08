import { AfterViewInit, Component } from '@angular/core';
import { BootstrapService } from "./services/bootstrap.service";
import { IpcRenderer } from 'electron'
import { LoggingService } from "./services/logging.service";
import { LogLevel } from "./models/types";
import { GridSearchService } from "./services/grid-search.service";
import { ConfigurationService } from "./services/configuration.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent
{
  title = 'configuration-app';
  private ipcRenderer: IpcRenderer;

  public constructor(private bootStrapService: BootstrapService, private loggingService: LoggingService, private configurationService: ConfigurationService)
  {
    if ((<any>window).require)
    {
      try
      {
        this.ipcRenderer = (<any>window).require('electron').ipcRenderer;
        this.log("Successfully created IPC renderer in App component. Component is now ready to receive context menu commands.", LogLevel.DEBUG);

        this.ipcRenderer.on('context-menu-command', (event, arg) =>
        {
          this.log('App component received context-menu-command: ' + arg, LogLevel.DEBUG);

          switch(arg)
          {
            case "Refresh Configurations":
              this.configurationService.loadAllConfigurations();
              break;
            case "Add Configuration":
              break;
            case "Edit Configuration":
              break;
          }
        })
      }
      catch (e)
      {
        throw e;
      }
    }
    else
      this.log("Unable to create IPC renderer in App component.", LogLevel.DEBUG);
  }

  private log(message: string, logLevel: LogLevel): void
  {
    this.loggingService.log("AppComponent", message, logLevel);
  }
}
