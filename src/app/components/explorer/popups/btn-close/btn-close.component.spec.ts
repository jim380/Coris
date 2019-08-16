import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnCloseComponent } from './btn-close.component';

describe('BtnCloseComponent', () => {
  let component: BtnCloseComponent;
  let fixture: ComponentFixture<BtnCloseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnCloseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
