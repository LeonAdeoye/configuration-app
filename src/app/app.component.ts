import { Component } from '@angular/core';
import { BootstrapService } from "./services/bootstrap.service";
import { LoggingService } from "./services/logging.service";
import { LogLevel } from "./models/types";
import { ConfigurationService } from "./services/configuration.service";
import { Configuration } from "./models/configuration";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent
{
  private isDetailPanelVisibleFlag: boolean = false;
  title = 'configuration-app';
  owner: string;
  key: string;
  value: string;

  public constructor(private bootStrapService: BootstrapService, private loggingService: LoggingService, private configurationService: ConfigurationService)
  {
    this.configurationService.editConfigurationSubject.subscribe((configuration) => this.editConfiguration(configuration));
    this.configurationService.cloneConfigurationSubject.subscribe((configuration) => this.cloneConfiguration(configuration));
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
    // TODO make detail component visible.
    this.isDetailPanelVisibleFlag = true;
    this.configurationService.addNewConfiguration();
  }

  private editConfiguration(configuration: Configuration): void
  {
    this.log(`Editing selected configuration ID: ${JSON.stringify(configuration)}`, LogLevel.DEBUG);

    this.owner = configuration.getOwner();
    this.key = configuration.getKey();
    this.value = configuration.getValue();

    this.toggleDetailPanelVisibility();
    this.configurationService.editConfiguration();
  }

  private cloneConfiguration(configuration: Configuration): void
  {
    this.log(`Cloning selected configuration ID: ${JSON.stringify(configuration)}`, LogLevel.DEBUG);
    this.toggleDetailPanelVisibility();
    this.configurationService.addNewConfiguration();
  }
}
