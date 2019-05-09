import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerEventCardComponent } from './power-event-card.component';

describe('PowerEventCardComponent', () => {
  let component: PowerEventCardComponent;
  let fixture: ComponentFixture<PowerEventCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PowerEventCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerEventCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
