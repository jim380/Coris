import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatorsTableComponent } from './validators-table.component';

describe('ValidatorsTableComponent', () => {
  let component: ValidatorsTableComponent;
  let fixture: ComponentFixture<ValidatorsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidatorsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidatorsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
