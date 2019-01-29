import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.css']
})
export class BlocksComponent implements OnInit {
  currentBlock = 0;
  startBlock = 0;
  blocks = [];
  blocksToDisplay = 20;

  constructor(private http: HttpClient) { }

  fetchBlocks() {
    this.http.get(`https://aakatev.me/iris/blockchain?minHeight=${this.currentBlock-this.blocksToDisplay+1}&maxHeight=${this.currentBlock}`).subscribe(data => {
      this.blocks = data['result'].block_metas;
    });
  }

  displayOlderBlocks() {
    if(this.currentBlock - this.blocksToDisplay > 20) {
      this.currentBlock -= this.blocksToDisplay;
    }
    this.fetchBlocks();
  }

  displayNewerBlocks() {
    if(this.currentBlock + this.blocksToDisplay <= this.startBlock) {
      this.currentBlock += this.blocksToDisplay;
    }
    this.fetchBlocks();
  }

  ngOnInit() {
    this.http.get('https://aakatev.me/iris/status').subscribe(data => {
      this.startBlock = data['result'].sync_info.latest_block_height;
      this.currentBlock = this.startBlock;
      this.fetchBlocks();
    });
  }
}
