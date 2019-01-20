import { Component, OnInit } from '@angular/core';
import { WsService } from '../ws.service';
import { Block } from '../blocks/block';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  providers: [WsService],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  blocks = [];
  txs = [];

  constructor(private ws:WsService) { 
    this.blocks=this.ws.getWsBlockStore();
    this.txs=this.ws.getWsTxStore();
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.ws.unsubscribe();
  }
}
