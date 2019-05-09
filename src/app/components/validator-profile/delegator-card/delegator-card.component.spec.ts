import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegatorCardComponent } from './delegator-card.component';

describe('DelegatorCardComponent', () => {
  let component: DelegatorCardComponent;
  let fixture: ComponentFixture<DelegatorCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelegatorCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelegatorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
