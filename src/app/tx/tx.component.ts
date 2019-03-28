import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { nodeRpc } from '../../config.js'
import { Tx, Tag } from '../interfaces/tx.interface';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tx',
  templateUrl: './tx.component.html',
  styleUrls: ['./tx.component.css']
})
export class TxComponent implements OnInit {
  txHash;
  tx:Tx;

  async clickButton(value) {
    // Debugging @aakatev
    // console.log(value);
    await this.router.navigate([`tx/${value}`]);
    this.queryTx();
  }

  initTxHash() {
    this.txHash = this.route.snapshot.paramMap.get('hash');
  }

  constructor(
    private http: HttpClient, 
    private route: ActivatedRoute, 
    private router: Router ) {  
      this.initTxHash();
  }

  ngOnInit() {
    this.queryTx();
  }

  queryTx () {
    this.initTxHash();
    this.http.get(`${nodeRpc}/tx_search?query="tx.hash='${this.txHash}'"`).subscribe(async data => {

      if (data['error'] === undefined)  {
      
        const dataTx = await data['result'].txs[0];
        let dataTagsDecod : Tag[] = [];

        dataTx.tx_result.tags.forEach(tag => {
          dataTagsDecod.push(this.decodeTag(tag));
        });

        // console.log(dataTagsDecod);
        // console.log(this.decodeTag(dataTx.tx_result.tags[1]));
        this.tx = {
          hash: dataTx.hash, 
          height: dataTx.height,
          gasUsed: dataTx.tx_result.gasUsed,
          gasWanted: dataTx.tx_result.gasWanted,
          txBase64: dataTx.tx,
          txDecod: atob(dataTx.tx),
          tagsBase64: dataTx.tx_result.tags,
          tagsDecod: dataTagsDecod
        };
        console.log(this.tx);
      }
    });
  }

  decodeTag (tagsBase64) {
    return ({
      key: atob(tagsBase64.key),
      value: atob(tagsBase64.value)
    })
  }

}
