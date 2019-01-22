import { Component } from '@angular/core';
import { State } from './state';
import { HttpClient } from '@angular/common/http';
import { WsService } from './ws.service';
import { Observable } from 'rxjs';
import { Block } from './blocks/block';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  appState: Observable<{blocks: [], txs:[]}>;

  constructor(private http: HttpClient, private ws:WsService, private store: Store<{App: { blocks: [], txs: [] } }>) {
    console.log('constr!');
  }

  ngOnInit() { 
    this.appState = this.store.select('App');
  }

  ngAfterViewInit() {
    console.log('init!');
    
  }

  ngOnDestroy() {
    this.ws.unsubscribe();
  }

}

