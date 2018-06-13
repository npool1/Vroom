import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenancedashComponent } from './maintenancedash.component';

describe('MaintenancedashComponent', () => {
  let component: MaintenancedashComponent;
  let fixture: ComponentFixture<MaintenancedashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenancedashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenancedashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
