import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { Router } from '@angular/router';

import { nodeRpc1, nodeRpc2 } from '../../../config.js'
import { Tx, Tag, decodeTag } from '../../interfaces/tx.interface';


@Component({
  selector: 'app-txs',
  templateUrl: './txs.component.html',
  styleUrls: ['./txs.component.css']
})
export class TxsComponent implements OnInit {
  txs: Tx[];
  minHeight = 0;
  lastBlock = 0;
  // @aakatev TODO lookup how to query more than 30 txs at json
  blocksToScan = 3000;

  displayedColumns: string[] = [
    'hash', 
    'type', 
    'fee',
    'height',
    'timestamp'
  ];

  constructor(private http: HttpClient, @Inject(DOCUMENT) document, private router: Router) { }

  ngOnInit() {
    this.http.get(`${nodeRpc2}/status`).subscribe(data => {
      this.lastBlock = data['result'].sync_info.latest_block_height;
      this.minHeight = this.lastBlock - this.blocksToScan;
      // this.clearTxs();
      this.fetchTxs();
    });
  }


  clearTxs() {
    this.txs = [];
  }
  clickButton(value) {
    console.log(value);
    this.router.navigate([`tx/${value}`]);
  }

  
  fetchTxs() {
    document.getElementById('btn-older').classList.add('is-loading');
    this.http.get(`${nodeRpc2}/tx_search?query="tx.height>${this.minHeight}"`)
      .subscribe(data => {
      this.clearTxs();
      let currTxs = data['result'].txs.reverse();
      
      // Debugging
      // console.log(data['result'].txs);

      currTxs.forEach(dataTx => {
        if(dataTx.height < this.minHeight + this.blocksToScan) {
          // const dataTx = await data['result'].txs[0];
          let dataTagsDecod : Tag[] = [];

          // Debugging
          // console.log(dataTx);

          if(dataTx.tx_result.tags) {
            dataTx.tx_result.tags.forEach(tag => {
              dataTagsDecod.push(decodeTag(tag));
            });
          } else {
            // @aakatev TODO add handling to other faulty txs
            let errValue = "faulty"
            if (dataTx.tx_result.code === 12 ) {
              errValue = `Out of gas(Wanted: ${dataTx.tx_result.gasWanted})`
            }

            // Debugging
            // console.log("Faulty_tx", dataTx);
            
            dataTagsDecod.push({
              key: "type",
              value: errValue
            })
          }

          // console.log(dataTagsDecod);
          // console.log(this.decodeTag(dataTx.tx_result.tags[1]));
          
          this.txs.push({
            hash: dataTx.hash, 
            height: dataTx.height,
            gasUsed: dataTx.tx_result.gasUsed,
            gasWanted: dataTx.tx_result.gasWanted,
            txBase64: dataTx.tx,
            txDecod: atob(dataTx.tx),
            tagsBase64: dataTx.tx_result.tags,
            tagsDecod: dataTagsDecod
          });        
        }
      });
      if(this.txs.length > 0) {
        this.txs.forEach(tx => {
          this.getTxDetails(tx)
            .subscribe(data => {
              // Debugging
              console.log(data);
              tx.details = data;
            });
        })
      }
      document.getElementById('btn-older').classList.remove('is-loading');
    });
  }

  // TODO: Double check whether this fxn is inclusive
  displayOlderTxs () {
    this.minHeight -= this.blocksToScan;
    this.fetchTxs();  
  }

  getTxDetails(tx: Tx) {
    return this.http.get(`${nodeRpc1}/txs/${tx.hash}`);
  }
}
