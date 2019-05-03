import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Block } from '../../interfaces/block.interface';
import { nodeRpc2 } from '../../../config.js';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { debounceTime, map } from "rxjs/operators";
import { State } from 'src/app/interfaces/state.interface';
import { rowsAnimation, expandableRow, staggerAnimation} from 'src/app/animations/animation';
import { MatTable } from '@angular/material';
// import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.scss'],
  animations: [rowsAnimation, expandableRow, staggerAnimation]
})
export class BlocksComponent implements OnInit, OnDestroy {
  @ViewChild(MatTable) table: MatTable<any>;

  displayedColumns: string[] = [
    'height', 
    'transactions', 
    'proposer',
    'timestamp'
  ];
  
  // dataSource: MatTableDataSource<Block>;

  appState: Observable<State>;
  
  blocks: Block[];
  currentBlock = 0;
  startBlock = 0;
  blocksToDisplay = 20;
  blocks$;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store <State> ) {
      // const blocks: Block[] = [];
      // this.dataSource = new MatTableDataSource(blocks);
     }

  ngOnInit() {
    this.appState = this.store.select('App');
    this.blocks$ = this.appState.
      pipe(
        map(data => data.blocks),
        debounceTime(300)
      )
      .subscribe( data => { 
        if( data.length === 1 && this.currentBlock !== data[0].header.height) {
          if(!this.blocks) {
            this.startBlock = data[0].header.height;
            this.initBlocks();  
          } else if (this.blocks[0].height !== data[0].header.height) {
            this.addBlock(data[0].header.height);
          }
          // TODO remove debugging
          // console.log(data[0]);
          // console.log(this.currentBlock);
        }
      });
  }

  ngOnDestroy() {
    this.blocks$.unsubscribe();
  }

  initBlocks() {
    this.currentBlock = this.startBlock;
    this.fetchBlocks();
  }

  addBlock(height) {
    this.http.get(`${nodeRpc2}/blockchain?minHeight=${height}&maxHeight=${height}`)
      .subscribe(data => {
        // TODO remove debugging
        // console.log(data);
        data['result'].block_metas.forEach(block => {
          const datePipe = new DatePipe('en-US');
          const formattedTime = datePipe.transform(block.header.time, 'h:mm:ss a, MMM d, y');
          this.blocks.unshift({
            hash: block.block_id.hash, 
            height: block.header.height, 
            time: formattedTime,
            txs: block.header.num_txs,
            proposer: block.header.proposer_address
          });
          this.blocks.pop();
          this.table.renderRows();
        });
        // TODO remove debugging
        // console.log(this.blocks);
      });
  }

  clearBlocks() {
    this.blocks = [];
  }

  clickButton(value) {
    // TODO remove debugging
    // console.log(value);
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

  // displayOlderBlocks() {
  //   if(this.currentBlock - this.blocksToDisplay > 20) {
  //     document.getElementById('btn-newer').removeAttribute('disabled');
  //     this.currentBlock -= this.blocksToDisplay;
  //   }
  //   this.fetchBlocks();
  // }

  // displayNewerBlocks() {
  //   if(this.currentBlock + this.blocksToDisplay == this.startBlock) {
  //     document.getElementById('btn-newer').setAttribute('disabled', 'true');
  //     this.currentBlock += this.blocksToDisplay;
  //   } else if(this.currentBlock + this.blocksToDisplay < this.startBlock) {
  //     this.currentBlock += this.blocksToDisplay;
  //   }
  //   this.fetchBlocks();
  // }
}