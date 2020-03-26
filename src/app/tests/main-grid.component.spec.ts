import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainGridComponent } from '../components/main-grid/main-grid.component';
import { GridSearchService } from "../services/grid-search.service";
import { ConfigurationService } from "../services/configuration.service";
import { LoggingService } from "../services/logging.service";

describe('MainGridComponent', () =>
{
  let component: MainGridComponent;
  let fixture: ComponentFixture<MainGridComponent>;
  const spyConfigurationService = jasmine.createSpyObj('ConfigurationService', ['loadAllConfigurations', 'getAllConfigurations','setCurrentUser', 'getCurrentUser']);
  const spyLoggingService = jasmine.createSpyObj('LoggingService', ['log', 'initialize']);
  const spyGridSearchService = jasmine.createSpyObj('GridSearchService', ['setText']);

  beforeEach(async(() =>
  {
    TestBed.configureTestingModule({
      declarations: [ MainGridComponent ],
      providers:
      [
        { provide: ConfigurationService, useValue: spyConfigurationService },
        { provide: LoggingService, useValue: spyLoggingService },
        { provide: GridSearchService, useValue: spyGridSearchService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() =>
  {
    fixture = TestBed.createComponent(MainGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
