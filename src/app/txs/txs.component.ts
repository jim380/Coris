import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { Tx } from './tx';
import { nodeRpc } from '../../config.js'
import { Router } from '@angular/router';


@Component({
  selector: 'app-txs',
  templateUrl: './txs.component.html',
  styleUrls: ['./txs.component.css']
})
export class TxsComponent implements OnInit {
  txs: Tx[];
  minHeight = 0;
  lastBlock = 0;
  blocksToScan = 100;

  constructor(private http: HttpClient, @Inject(DOCUMENT) document, private router: Router) { }

  clearTxs() {
    this.txs = [];
  }
  clickButton(value) {
    console.log(value);
    this.router.navigate([`tx/${value}`]);
  }

  fetchTxs() {
    document.getElementById('btn-older').classList.add('is-loading');
    this.http.get(`${nodeRpc}/tx_search?query="tx.height>${this.minHeight}"`).subscribe(data => {
      // console.log(`${nodeRpc}/tx_search?query="tx.height>${this.minHeight}"`);
      let currTxs = data['result'].txs.reverse();
      
      currTxs.forEach(tx => {
        if(tx.height < this.minHeight + this.blocksToScan) {
          this.txs.push({
            hash: tx.hash, 
            height: tx.height,
            gasUsed: tx.tx_result.gasUsed,
            gasWanted: tx.tx_result.gasWanted
          });        
        }
      });
      document.getElementById('btn-older').classList.remove('is-loading');
    });
  }

  ngOnInit() {
    this.http.get(`${nodeRpc}/status`).subscribe(data => {
      this.lastBlock = data['result'].sync_info.latest_block_height;
      this.minHeight = this.lastBlock - this.blocksToScan;
      this.clearTxs();
      this.fetchTxs();  
    });
  }

  // TODO: Double check whether this fxn is inclusive
  displayOlderTxs () {
    this.minHeight -= this.blocksToScan;
    this.fetchTxs();  
  }

  
}
