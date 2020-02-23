import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainGridComponent } from '../components/main-grid/main-grid.component';

describe('MainGridComponent', () => {
  let component: MainGridComponent;
  let fixture: ComponentFixture<MainGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
