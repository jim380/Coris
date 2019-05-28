import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
// import { Block } from '../../interfaces/block.interface';
import { Observable } from 'rxjs';
import { BlocksState, State } from 'src/app/state/app.interface';
import { selectBlocksState } from 'src/app/state/blocks/blocks.reducers';

@Component({
  selector: 'app-last-block',
  templateUrl: './last-block.component.html',
  styleUrls: ['./last-block.component.scss']
})
export class LastBlockComponent implements OnInit {
  blocksState: Observable<BlocksState>;
  displayCommits = false;

  constructor(private store: Store<State>) { }

  ngOnInit() { 
    this.blocksState = this.store.select(selectBlocksState);
  }

  showHideElem() {
    this.displayCommits = !this.displayCommits;
  }
}
