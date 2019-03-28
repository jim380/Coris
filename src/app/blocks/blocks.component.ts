import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Block } from './block';
import { nodeRpc } from '../../config.js';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.css']
})
export class BlocksComponent implements OnInit {
  blocks: Block[];
  currentBlock = 0;
  startBlock = 0;
  blocksToDisplay = 20;

  constructor(private http: HttpClient, private router: Router) { }

  clearBlocks() {
    this.blocks = [];
  }

  clickButton(value) {
    console.log(value);
    this.router.navigate([`block/${value}`]);
  }

  fetchBlocks() {
    this.http.get(`${nodeRpc}/blockchain?minHeight=${this.currentBlock-this.blocksToDisplay+1}&maxHeight=${this.currentBlock}`)
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

  ngOnInit() {
    this.http.get(`${nodeRpc}/status`).subscribe(data => {
      this.startBlock = data['result'].sync_info.latest_block_height;
      this.currentBlock = this.startBlock;
      this.fetchBlocks();
    });
  }
}
