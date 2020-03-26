import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailComponent } from '../components/detail/detail.component';
import { ConfigurationService } from "../services/configuration.service";
import { LoggingService } from "../services/logging.service";

describe('DetailComponent', () =>
{
  let component: DetailComponent;
  const spyConfigurationService = jasmine.createSpyObj('ConfigurationService', ['loadAllConfigurations']);
  const spyLoggingService = jasmine.createSpyObj('LoggingService', ['log']);
  let fixture: ComponentFixture<DetailComponent>;

  beforeEach(async(() =>
  {
    TestBed.configureTestingModule({
      declarations:
        [
          DetailComponent
        ],
      providers: [
        { provide: ConfigurationService, useValue: spyConfigurationService },
        { provide: LoggingService, useValue: spyLoggingService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() =>
  {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
