// Component to test services
// @aakatev 05/13/19 
// TODO delete component
import { Component, OnInit} from '@angular/core';
import { Observable, range, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { distinctUntilChanged } from 'rxjs/operators';
import { BlocksService } from 'src/app/services/blocks.service';
import * as LedgerApp from './lib/ledger-cosmos-js/src/index-browserify'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})

export class TestComponent implements OnInit {

  constructor(
  ) { }
  

  ngOnInit() { 
    console.log(LedgerApp);
    
    this.getAddrAndPubkey();
    // this.signTx();
  }

  getCosmosAppVersion() {
    const TIMEOUT = 2;

    return LedgerApp.comm_u2f.create_async(TIMEOUT, true).then(
      function (comm) {
        try {
          let dev = new LedgerApp.App(comm);
          return dev.get_version().then(function (result) {
            console.log(result);
          })
        }
        catch (e) {
          console.log(e)
        }
      });
  }


  signTx () {
    const TIMEOUT = 120;
    const path = [44, 118, 0, 0, 0];

    let response;
    let tx = `{"account_number":1,"chain_id":"some_chain","fee":{"amount":[{"amount":10,"denom":"DEN"}],"gas":5},"memo":"MEMO","msgs":["SOMETHING"],"sequence":3}`;
    
    return LedgerApp.comm_u2f.create_async(TIMEOUT, true).then(
      async function (comm) {
        try {
          let app = new LedgerApp.App(comm);
          response = await app.sign(path, tx);
          console.log(response);
        }
        catch (e) {
          console.log(e)
        }
      })
  }

  getAddrAndPubkey () {
    const TIMEOUT = 120;
    const path = [44, 118, 0, 0, 0];

    let response;
    let tx = `{"account_number":1,"chain_id":"some_chain","fee":{"amount":[{"amount":10,"denom":"DEN"}],"gas":5},"memo":"MEMO","msgs":["SOMETHING"],"sequence":3}`;
    
    return LedgerApp.comm_u2f.create_async(TIMEOUT, true).then(
      async function (comm) {
        try {
          let app = new LedgerApp.App(comm);
          response = await app.getAddressAndPubKey("cosmos", path);
          console.log(response);
        }
        catch (e) {
          console.log(e)
        }
      })
  }
}
