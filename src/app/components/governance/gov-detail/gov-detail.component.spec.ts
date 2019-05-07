import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GovDetailComponent } from './gov-detail.component';

describe('GovDetailComponent', () => {
  let component: GovDetailComponent;
  let fixture: ComponentFixture<GovDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GovDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GovDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
