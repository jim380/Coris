import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatorSpanComponent } from './validator-span.component';

describe('ValidatorSpanComponent', () => {
  let component: ValidatorSpanComponent;
  let fixture: ComponentFixture<ValidatorSpanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidatorSpanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidatorSpanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
