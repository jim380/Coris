import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusCard1Component } from './status-card1.component';

describe('StatusCard1Component', () => {
  let component: StatusCard1Component;
  let fixture: ComponentFixture<StatusCard1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusCard1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusCard1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
