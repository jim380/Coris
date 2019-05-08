import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricsCardComponent } from './metrics-card.component';

describe('MetricsCardComponent', () => {
  let component: MetricsCardComponent;
  let fixture: ComponentFixture<MetricsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetricsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
