import { Component, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { Inject }  from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { nodeRpc } from '../../config.js'

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tx',
  templateUrl: './tx.component.html',
  styleUrls: ['./tx.component.css']
})
export class TxComponent implements OnInit {
  txHash;
  tx = {};

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
    @Inject(DOCUMENT) document, 
    private route: ActivatedRoute, 
    private router: Router ) {  
      this.initTxHash();
  }

  queryTx () {
    this.initTxHash();
    this.http.get(`${nodeRpc}/tx_search?query="tx.hash='${this.txHash}'"`).subscribe(data => {
      if (data['error'] === undefined) this.tx = data['result'].txs[0];
      else this.tx = {};
    });
    console.log(this.tx);
  }

  ngOnInit() {
    this.queryTx();
  }
}
