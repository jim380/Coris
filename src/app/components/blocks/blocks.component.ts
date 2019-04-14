import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Block } from '../../interfaces/block.interface';
import { nodeRpc2 } from '../../../config.js';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { debounceTime, map } from "rxjs/operators";
import { State } from 'src/app/interfaces/state.interface';

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.css']
})
export class BlocksComponent implements OnInit, OnDestroy {
  appState: Observable<State>;
  blocks: Block[];
  currentBlock = 0;
  startBlock = 0;
  blocksToDisplay = 20;
  blocks$;

  displayedColumns: string[] = [
    'height', 
    'transactions', 
    'proposer',
    'timestamp'
  ];

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store <State> ) { }

  ngOnInit() {
    this.initBlocks();
    this.appState = this.store.select('App');
    this.blocks$ = this.appState.
      pipe(
        map(data => data.blocks),
        debounceTime(1000)
      )
      .subscribe( data => { 
        this.initBlocks();
        // console.log(data)
      });
  }

  ngOnDestroy() {
    this.blocks$.unsubscribe();
  }

  initBlocks() {
    this.http.get(`${nodeRpc2}/status`).subscribe(data => {
      this.startBlock = data['result'].sync_info.latest_block_height;
      this.currentBlock = this.startBlock;
      this.fetchBlocks();
    });
  }

  clearBlocks() {
    this.blocks = [];
  }

  clickButton(value) {
    console.log(value);
    this.router.navigate([`block/${value}`]);
  }

  fetchBlocks() {
    this.http.get(`${nodeRpc2}/blockchain?minHeight=${this.currentBlock-this.blocksToDisplay+1}&maxHeight=${this.currentBlock}`)
      .subscribe(data => {
        this.clearBlocks();
        data['result'].block_metas.forEach(block => {
          const datePipe = new DatePipe('en-US');
          const formattedTime = datePipe.transform(block.header.time, 'h:mm:ss a, MMM d, y');
          this.blocks.push({
            hash: block.block_id.hash, 
            height: block.header.height, 
            time: formattedTime,
            txs: block.header.num_txs,
            proposer: block.header.proposer_address
          });
        });
      });
  }

  displayOlderBlocks() {
    if(this.currentBlock - this.blocksToDisplay > 20) {
      document.getElementById('btn-newer').removeAttribute('disabled');
      this.currentBlock -= this.blocksToDisplay;
    }
    this.fetchBlocks();
  }

  displayNewerBlocks() {
    if(this.currentBlock + this.blocksToDisplay == this.startBlock) {
      document.getElementById('btn-newer').setAttribute('disabled', 'true');
      this.currentBlock += this.blocksToDisplay;
    } else if(this.currentBlock + this.blocksToDisplay < this.startBlock) {
      this.currentBlock += this.blocksToDisplay;
    }
    this.fetchBlocks();
  }
}
