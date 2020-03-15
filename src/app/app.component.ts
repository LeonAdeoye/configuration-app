import { Component } from '@angular/core';
import { BootstrapService } from "./services/bootstrap.service";
import { LoggingService } from "./services/logging.service";
import { LogLevel } from "./models/types";
import { ConfigurationService } from "./services/configuration.service";
import { Configuration } from "./models/configuration";
import { IpcRenderer } from "electron";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent
{
  private isDetailPanelVisibleFlag: boolean = false;
  title = 'configuration-app';

  configuration : Configuration;
  private ipcRenderer: IpcRenderer;

  public constructor(private bootStrapService: BootstrapService, private loggingService: LoggingService, private configurationService: ConfigurationService)
  {
    this.configurationService.editConfigurationSubject.subscribe((configuration) => this.editConfiguration(configuration));
    this.configurationService.cloneConfigurationSubject.subscribe((configuration) => this.cloneConfiguration(configuration));

    if ((<any>window).require)
    {
      try
      {
        this.ipcRenderer = (<any>window).require('electron').ipcRenderer;
        this.log("Successfully created IPC renderer in App component. Component is now ready to receive context menu commands.", LogLevel.DEBUG);

        this.ipcRenderer.on('context-menu-command', (event, arg) =>
        {
          this.log('App component received context-menu-command: ' + arg, LogLevel.DEBUG);

          if(arg === "Add Configuration")
            this.addConfiguration();
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

  public isDetailPanelVisible(): boolean
  {
    return this.isDetailPanelVisibleFlag;
  }

  public toggleDetailPanelVisibility(): void
  {
    this.isDetailPanelVisibleFlag = !this.isDetailPanelVisibleFlag;
  }

  private log(message: string, logLevel: LogLevel): void
  {
    this.loggingService.log("AppComponent", message, logLevel);
  }

  private addConfiguration(): void
  {
    this.log(`Adding a new configuration...`, LogLevel.DEBUG);
    this.configuration = new Configuration();
    this.toggleDetailPanelVisibility();
  }

  private editConfiguration(configuration: Configuration): void
  {
    this.log(`Editing selected configuration ID: ${JSON.stringify(configuration)}`, LogLevel.DEBUG);
    this.configuration = configuration;
    this.toggleDetailPanelVisibility();
  }

  private cloneConfiguration(configuration: Configuration): void
  {
    this.log(`Cloning selected configuration ID: ${JSON.stringify(configuration)}`, LogLevel.DEBUG);
    this.configuration = configuration;
    this.toggleDetailPanelVisibility();
  }
}
