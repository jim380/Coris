import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
// import { Block } from '../../interfaces/block.interface';
import { Observable } from 'rxjs';
import { State } from 'src/app/interfaces/state.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  appState: Observable<State>;

  constructor(
    private store: Store<State>) { }

  ngOnInit() { 
    this.appState = this.store.select('App');
  }
}
