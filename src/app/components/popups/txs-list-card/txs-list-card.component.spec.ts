import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TxsListCardComponent } from './txs-list-card.component';

describe('TxsListCardComponent', () => {
  let component: TxsListCardComponent;
  let fixture: ComponentFixture<TxsListCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TxsListCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TxsListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
