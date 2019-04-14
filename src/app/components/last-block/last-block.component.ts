import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
// import { Block } from '../../interfaces/block.interface';
import { Observable } from 'rxjs';
import { State } from 'src/app/interfaces/state.interface';

@Component({
  selector: 'app-last-block',
  templateUrl: './last-block.component.html',
  styleUrls: ['./last-block.component.css']
})
export class LastBlockComponent implements OnInit {
  appState: Observable<State>;
  displayCommits = false;

  constructor(private store: Store<State>) { }

  ngOnInit() { 
    this.appState = this.store.select('App');
  }

  showHideElem() {
    this.displayCommits = !this.displayCommits;
  }
}
