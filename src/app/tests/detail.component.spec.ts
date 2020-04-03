import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { DetailComponent } from '../components/detail/detail.component';
import { ConfigurationService } from "../services/configuration.service";
import { LoggingService } from "../services/logging.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ConfigurationServiceMock } from "./mock-configuration.service";

describe('DetailComponent', () =>
{
  let component: DetailComponent;
  const spyLoggingService = jasmine.createSpyObj('LoggingService', ['log']);
  let fixture: ComponentFixture<DetailComponent>;

  beforeEach(async(() =>
  {
    TestBed.configureTestingModule({
      declarations:
      [
        DetailComponent
      ],
      imports:
      [
        HttpClientTestingModule
      ],
      providers:
      [
        { provide: ConfigurationService, useClass: ConfigurationServiceMock },
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

  describe('canClear', () =>
  {
    it('should return false when input configuration is not set', () =>
    {
      // Act
      let result = component.canClear();
      // Assert
      expect(result).not.toBeTruthy();
    });
  });

  describe('save', () =>
  {
    it('should call configuration service saveConfiguration', inject([ConfigurationService], (configurationService) =>
    {
      // Arrange
      spyOn(configurationService, 'saveConfiguration');
      // Act
      component.save();
      // Assert
      expect(configurationService.saveConfiguration).toHaveBeenCalled();
    }));
  });
});
