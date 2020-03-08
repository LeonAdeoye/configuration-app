import { Component } from '@angular/core';
import { BootstrapService } from "./services/bootstrap.service";
import { LoggingService } from "./services/logging.service";
import { LogLevel } from "./models/types";
import { ConfigurationService } from "./services/configuration.service";
import { BehaviorSubject, Subject } from "rxjs";
import { Configuration } from "./models/configuration";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent
{
  title = 'configuration-app';
  public configurationSubject = new Subject<Configuration>();
  private selectedConfiguration: Configuration;

  public constructor(private bootStrapService: BootstrapService, private loggingService: LoggingService, private configurationService: ConfigurationService)
  {
    this.configurationSubject.subscribe((configuration) =>
    {
      this.selectedConfiguration = configuration;
    })
  }

  private log(message: string, logLevel: LogLevel): void
  {
    this.loggingService.log("AppComponent", message, logLevel);
  }

  private addConfiguration(): void
  {
    // TODO make detail component visible.
    this.configurationService.addNewConfiguration();
  }

  private editConfiguration(): void
  {
    // TODO make detail component visible.
    this.configurationService.editConfiguration();
  }

  private cloneConfiguration(): void
  {
    // TODO make detail component visible.
    this.configurationService.addNewConfiguration();
  }
}
