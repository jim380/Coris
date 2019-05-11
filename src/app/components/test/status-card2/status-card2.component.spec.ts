import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusCard2Component } from './status-card2.component';

describe('StatusCard2Component', () => {
  let component: StatusCard2Component;
  let fixture: ComponentFixture<StatusCard2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusCard2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusCard2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
