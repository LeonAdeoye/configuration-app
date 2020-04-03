import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { MainHeaderComponent } from '../components/main-header/main-header.component';
import { ConfigurationService } from "../services/configuration.service";
import { LoggingService } from "../services/logging.service";
import { GridSearchService } from "../services/grid-search.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ConfigurationServiceMock } from "./mock-configuration.service";

describe('MainHeaderComponent', () =>
{
  let component: MainHeaderComponent;
  let fixture: ComponentFixture<MainHeaderComponent>;

  const spyLoggingService = jasmine.createSpyObj('LoggingService', ['log', 'initialize']);
  const spyGridSearchService = jasmine.createSpyObj('GridSearchService', ['setText']);

  beforeEach(async(() =>
  {
    TestBed.configureTestingModule({
      declarations:
      [
        MainHeaderComponent
      ],
      imports:
      [
        HttpClientTestingModule
      ],
      providers:
      [
        { provide: ConfigurationService, useClass: ConfigurationServiceMock },
        { provide: LoggingService, useValue: spyLoggingService },
        { provide: GridSearchService, useValue: spyGridSearchService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() =>
  {
    fixture = TestBed.createComponent(MainHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () =>
  {
    expect(component).toBeTruthy();
  });

  describe('addConfiguration', () =>
  {
    it('should call configuration service addConfigurationSubject next', inject([ConfigurationService], (configurationService) =>
    {
      // Arrange
      spyOn(configurationService.addConfigurationSubject, 'next');
      // Act
      component.addConfiguration();
      // Assert
      expect(configurationService.addConfigurationSubject.next).toHaveBeenCalled();
    }));
  });
});
