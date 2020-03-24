import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from '../app.component';
import { ConfigurationService } from "../services/configuration.service";
import { BootstrapService } from "../services/bootstrap.service";
import { LoggingService } from "../services/logging.service";
import { HttpClientModule } from "@angular/common/http";

describe('AppComponent', () =>
{
  beforeEach(async(() =>
  {
    const spyConfigurationService = jasmine.createSpyObj('ConfigurationService', ['loadAllConfigurations']);
    const spyBootstrapService = jasmine.createSpyObj('BootstrapService', ['launch']);
    const spyLoggingService = jasmine.createSpyObj('LoggingService', ['log']);

    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        HttpClientModule
      ],
      providers: [
        { provide: ConfigurationService, useClass: spyConfigurationService },
        { provide: BootstrapService, useClass: spyBootstrapService },
        { provide: LoggingService, useClass: spyLoggingService }
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

  it('should render title', () =>
  {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('configuration-app app is running!');
  });
});
