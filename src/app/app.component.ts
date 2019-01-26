import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WsService } from './ws.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  appState: Observable<{blocks: [], txs:[], validators: []}>;

  constructor(private http: HttpClient, private ws:WsService, private store: Store<{App: { blocks: [], txs: [], validators:[] } }>) {  }

  ngOnInit() { 
    this.appState = this.store.select('App');
  }

  ngOnDestroy() {
    this.ws.unsubscribe();
  }

}

