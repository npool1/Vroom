import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachinedashComponent } from './machinedash.component';

describe('MachinedashComponent', () => {
  let component: MachinedashComponent;
  let fixture: ComponentFixture<MachinedashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachinedashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachinedashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
