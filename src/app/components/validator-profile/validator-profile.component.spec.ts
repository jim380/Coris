import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatorProfileComponent } from './validator-profile.component';

describe('ValidatorProfileComponent', () => {
  let component: ValidatorProfileComponent;
  let fixture: ComponentFixture<ValidatorProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidatorProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidatorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
