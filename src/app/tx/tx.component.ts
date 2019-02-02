import { Component, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { Inject }  from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tx',
  templateUrl: './tx.component.html',
  styleUrls: ['./tx.component.css']
})
export class TxComponent implements OnInit {
  txHash;
  tx = {};

  constructor(private http: HttpClient, @Inject(DOCUMENT) document, private route: ActivatedRoute) {  
    this.txHash = this.route.snapshot.paramMap.get('hash');
  }

  ngOnInit() {
    this.http.get(`https://aakatev.me/iris/tx_search?query="tx.hash='${this.txHash}'"`).subscribe(data => {
      this.tx = data['result'].txs[0];
    });
  }

}
