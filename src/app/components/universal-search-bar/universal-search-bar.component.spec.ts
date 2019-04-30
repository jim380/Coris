import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversalSearchBarComponent } from './universal-search-bar.component';

describe('UniversalSearchBarComponent', () => {
  let component: UniversalSearchBarComponent;
  let fixture: ComponentFixture<UniversalSearchBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversalSearchBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversalSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
