import { Component } from '@angular/core';
import { State } from './state';
import { HttpClient } from '@angular/common/http';
import { WsService } from './ws.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  appState = new State();

  constructor(private http: HttpClient, private ws:WsService) { 
    this.http.get('https://aakatev.me/iris/status').subscribe(data => {
      this.appState.lastBlock = data['result'].sync_info.latest_block_height;
      this.appState.chainId = data['result'].node_info.network;
    });
    this.appState.lastBlocks=this.ws.getWsBlockStore();
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.ws.unsubscribe();
  }

}

