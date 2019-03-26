import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTxComponent } from './new-tx.component';

describe('NewTxComponent', () => {
  let component: NewTxComponent;
  let fixture: ComponentFixture<NewTxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
