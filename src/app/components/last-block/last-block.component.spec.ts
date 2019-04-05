import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastBlockComponent } from './last-block.component';

describe('LastBlockComponent', () => {
  let component: LastBlockComponent;
  let fixture: ComponentFixture<LastBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
