import { Component, OnInit } from '@angular/core';
import { WsService } from '../ws.service';
import { Block } from '../blocks/block';

@Component({
  selector: 'app-last-block',
  templateUrl: './last-block.component.html',
  providers: [WsService],
  styleUrls: ['./last-block.component.css']
})
export class LastBlockComponent implements OnInit {
  blocks = [];

  constructor(private ws:WsService) { 
    this.blocks=this.ws.getWsBlockStore();
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.ws.unsubscribe();
  }
}
