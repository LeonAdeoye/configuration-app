import { Component, OnInit } from '@angular/core';
import { GridSearchService } from "../../services/grid-search.service";
import { ConfigurationService } from "../../services/configuration.service";
import { IpcRenderer } from "electron";
import { LogLevel } from "../../models/types";
import { LoggingService } from "../../services/logging.service";

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.sass']
})
export class MainHeaderComponent implements OnInit
{
  public gridSearchTextValue: string;
  private ipcRenderer: IpcRenderer;

  constructor(private gridSearchService: GridSearchService, private configurationService: ConfigurationService, private loggingService: LoggingService)
  {
    if ((<any>window).require)
    {
      try
      {
        this.ipcRenderer = (<any>window).require('electron').ipcRenderer;
        this.log("Successfully created IPC renderer in Main Grid component. Component is now ready to receive context menu commands.", LogLevel.DEBUG);

        this.ipcRenderer.on('context-menu-command', (event, arg) =>
        {
          this.log('Main Grid component received context-menu-command: ' + arg, LogLevel.DEBUG);
          switch(arg)
          {
            case "Clone Configurations":
              break;
            case "Edit Configuration":
              break;
            case "Delete Configuration":
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
      this.log("Unable to create IPC renderer in Main Grid component.", LogLevel.DEBUG);
  }

  ngOnInit(): void
  {
  }

  public changeGridSearchTextValue(event): void
  {
    if(event.keyCode === 27)
      this.gridSearchTextValue = "";
    else
      this.gridSearchTextValue = event.target.value;

    this.gridSearchService.setText(this.gridSearchTextValue);
  }

  public refreshConfigurations(): void
  {
    this.log("Refreshing configurations from the configuration micro-service.", LogLevel.INFO);
    this.configurationService.loadAllConfigurations();
  }

  public closeWindow(): void
  {
    this.log("Sending command request to close the app.", LogLevel.INFO);
    this.ipcRenderer.send('command-signal', 'close-app-command');
  }

  public minimizeWindow(): void
  {
    this.log("Sending command request to minimize the app.", LogLevel.INFO);
    this.ipcRenderer.send('command-signal', 'minimize-app-command');
  }

  public addConfiguration(): void
  {
    this.log("Adding new configuration...", LogLevel.INFO);
  }

  private log(message: string, logLevel: LogLevel): void
  {
    this.loggingService.log("MainHeaderComponent", message, logLevel);
  }
}
