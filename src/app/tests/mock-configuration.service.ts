import { Configuration } from "../models/configuration";
import { Subject } from "rxjs";

export class ConfigurationServiceMock {
  public editConfigurationSubject = new Subject<Configuration>();
  public cloneConfigurationSubject = new Subject<Configuration>();
  public addConfigurationSubject = new Subject();

  public setCurrentUser(value: string)
  {
  }

  public getCurrentUser(): string
  {
    return "";
  }

  public loadAllConfigurations() : void
  {
  }

  public getAllConfigurations(): Array<Configuration>
  {
    return [];
  }

  public deleteConfiguration(configurationId: string): void
  {
  }

  public saveConfiguration(configuration: Configuration): void
  {
  }

  getConfigurationValue(owner: string, key: string): string
  {
    return "";
  }
}
