import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposedBlocksCardComponent } from './proposed-blocks-card.component';

describe('ProposedBlocksCardComponent', () => {
  let component: ProposedBlocksCardComponent;
  let fixture: ComponentFixture<ProposedBlocksCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposedBlocksCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposedBlocksCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
