import { AfterViewInit, Component } from '@angular/core';
import { BootstrapService } from "./services/bootstrap.service";
import { IpcRenderer } from 'electron'
import { LoggingService } from "./services/logging.service";
import { LogLevel } from "./models/types";
import { GridSearchService } from "./services/grid-search.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent
{
  title = 'configuration-app';
  private ipcRenderer: IpcRenderer;
  public gridSearchTextValue: string;

  public constructor(private bootStrapService: BootstrapService, private loggingService: LoggingService, private gridSearchService: GridSearchService)
  {
    if ((<any>window).require)
    {
      try
      {
        this.ipcRenderer = (<any>window).require('electron').ipcRenderer;
        this.log("Successfully created IPC renderer in App component.", LogLevel.DEBUG);

        // TODO: use this command to see a message from a renderer to the main.js back-end.
        //this.ipcRenderer.send('my-custom-signal', 'hello, are you there?');

        this.ipcRenderer.on('context-menu-signal', (event, arg) =>
        {
          this.log('App component received context-menu-signal: ' + arg, LogLevel.DEBUG);
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

  private log(message: string, logLevel: LogLevel)
  {
    this.loggingService.log("AppComponent", message, logLevel);
  }

  changeGridSearchTextValue(event): void
  {
    if(event.keyCode === 27)
      this.gridSearchTextValue = "";
    else
      this.gridSearchTextValue = event.target.value;

    this.gridSearchService.setText(this.gridSearchTextValue);
  }
}
