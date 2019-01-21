import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { WsService } from '../ws.service';
import { Block } from '../blocks/block';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  providers: [WsService],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  appState: Observable<{blocks: [], txs: []}>;

  constructor(private ws:WsService, private store: Store<{App: { blocks: [], txs: []} }>) { }

  ngOnInit() { 
    this.appState = this.store.select('App')
  }

  ngOnDestroy() {
    this.ws.unsubscribe();
  }
}
