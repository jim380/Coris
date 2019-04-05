import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
// import { Block } from '../../interfaces/block.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-last-block',
  templateUrl: './last-block.component.html',
  styleUrls: ['./last-block.component.css']
})
export class LastBlockComponent implements OnInit {
  appState: Observable<{blocks: [], txs: [], round: {}}>;
  displayCommits = false;

  constructor(private store: Store<{App: { blocks: [], txs: [], round: {}} }>) { }

  ngOnInit() { 
    this.appState = this.store.select('App');
  }

  showHideElem() {
    this.displayCommits = !this.displayCommits;
  }
}
