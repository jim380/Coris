import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tx } from './tx'

@Component({
  selector: 'app-txs',
  templateUrl: './txs.component.html',
  styleUrls: ['./txs.component.css']
})
export class TxsComponent implements OnInit {
  txs = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('https://aakatev.me/iris/status').subscribe(data => {
      // Debugging
      // let currValidators = data['result'].genesis.validators;
      let lastBlock = data['result'].sync_info.latest_block_height;

      this.http.get(`https://aakatev.me/iris/tx_search?query="tx.height>${lastBlock-100}"`).subscribe(data => {
        let currTxs = data['result'].txs;

        currTxs.forEach(tx => {

          let newTx = {
            hash: tx.hash, 
            height: tx.height,
            gasUsed: tx.tx_result.gasUsed,
            gasWanted: tx.tx_result.gasWanted
          };
          this.txs.push(newTx);
        });
      });
    });
  }
}
