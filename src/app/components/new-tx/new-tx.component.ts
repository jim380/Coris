import { Component, OnInit } from '@angular/core';
import { TxsService } from '../../services/txs.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-tx',
  templateUrl: './new-tx.component.html',
  styleUrls: ['./new-tx.component.scss']
})
export class NewTxComponent implements OnInit {
  txData;

  // @aakatev testing addr
  // delegatorAddr = 'cosmos1pjmngrwcsatsuyy8m3qrunaun67sr9x78qhlvr';
  delegatorAddr = '';

  constructor(private txsService:TxsService, private route: ActivatedRoute) {
    this.delegatorAddr  = this.route.snapshot.paramMap.get('delegator');
  }  

  initTx () {
    this.txsService.postData(this.delegatorAddr).then(data => {
      this.txData = data;
    });
  }

  ngOnInit() {
    this.initTx();
  }

}
