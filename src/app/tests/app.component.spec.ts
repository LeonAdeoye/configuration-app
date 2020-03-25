import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from '../app.component';
import { ConfigurationService } from "../services/configuration.service";
import { BootstrapService } from "../services/bootstrap.service";
import { LoggingService } from "../services/logging.service";
import { Subject } from "rxjs";
import { Configuration } from "../models/configuration";

describe('AppComponent', () =>
{
  beforeEach(async(() =>
  {
    const spyConfigurationService = jasmine.createSpyObj('ConfigurationService', ['loadAllConfigurations', 'editConfigurationSubject.subscribe', 'addConfigurationSubject.subscribe', 'cloneConfigurationSubject.subscribe']);
    const spyBootstrapService = jasmine.createSpyObj('BootstrapService', ['launch']);
    const spyLoggingService = jasmine.createSpyObj('LoggingService', ['log']);

    spyConfigurationService.editConfigurationSubject.subscribe.and.returnValue(new Subject<Configuration>());
    spyConfigurationService.addConfigurationSubject.subscribe.and.returnValue(new Subject());
    spyConfigurationService.cloneConfigurationSubject.subscribe.and.returnValue(new Subject<Configuration>());

    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: ConfigurationService, useValue: spyConfigurationService },
        { provide: BootstrapService, useValue: spyBootstrapService },
        { provide: LoggingService, useValue: spyLoggingService }
      ]
    }).compileComponents();
  }));

  it('should create the app', () =>
  {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'configuration-app'`, () =>
  {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('configuration-app');
  });
});
