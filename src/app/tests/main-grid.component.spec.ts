import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MainGridComponent } from '../components/main-grid/main-grid.component';
import { GridSearchService } from "../services/grid-search.service";
import { ConfigurationService } from "../services/configuration.service";
import { LoggingService } from "../services/logging.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ConfigurationServiceMock } from "./mock-configuration.service";
import createSpyObj = jasmine.createSpyObj;
import { GridSearchServiceMock } from "./mock-grid-search.service";
import { MatMenuModule } from "@angular/material/menu";

describe('MainGridComponent', () =>
{
  let component: MainGridComponent;
  let fixture: ComponentFixture<MainGridComponent>;
  const spyLoggingService = createSpyObj('LoggingService', ['log', 'initialize']);

  beforeEach(async(() =>
  {
    TestBed.configureTestingModule({
      declarations:
      [
        MainGridComponent
      ],
      imports:
      [
        HttpClientTestingModule,
        MatMenuModule
      ],
      providers:
      [
        { provide: ConfigurationService, useClass: ConfigurationServiceMock },
        { provide: LoggingService, useValue: spyLoggingService },
        { provide: GridSearchService, useClass: GridSearchServiceMock }
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
