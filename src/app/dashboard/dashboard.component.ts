import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Block } from '../blocks/block';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  appState: Observable<{blocks: [], txs: []}>;

  constructor(private store: Store<{App: { blocks: [], txs: []} }>) { }

  ngOnInit() { 
    this.appState = this.store.select('App')
  }
}
