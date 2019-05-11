import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartCardsGovComponent } from './chart-cards-gov.component';

describe('ChartCardsGovComponent', () => {
  let component: ChartCardsGovComponent;
  let fixture: ComponentFixture<ChartCardsGovComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartCardsGovComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartCardsGovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
