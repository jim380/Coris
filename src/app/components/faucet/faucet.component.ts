import { Component, OnInit, OnDestroy } from '@angular/core';
import { FaucetService } from 'src/app/services/faucet.service';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state';
import { selectTxs } from 'src/app/state/txs/txs.reducers';
import { selectFaucetState } from 'src/app/state/faucet/faucet.reducers';
import { first, map } from 'rxjs/operators';
import { UpdateFaucetCoins } from 'src/app/state/faucet/faucet.actions';

@Component({
  selector: 'app-faucet',
  templateUrl: './faucet.component.html',
  styleUrls: ['./faucet.component.scss']
})
export class FaucetComponent implements OnInit, OnDestroy {
  statusText: string = 'n/a';
  statusClass: string = 'd-none' ;
  txsSize:number = 0;
  txs$ = this.appStore.select(selectTxs).subscribe(txs => this.txsSize = txs.length);
  faucet$ = this.appStore.select(selectFaucetState);

  constructor(
    private faucetService: FaucetService,
    private appStore: Store<State>
  ) { }

  ngOnInit( ) {
    this.faucet$.pipe(first(), map(state => state.address)).subscribe((address: any)=> {
      this.faucetService.getAccount(address).pipe(map((account: any) => account.value.coins)).subscribe((coins:any) => {
        console.log(coins);
        this.appStore.dispatch(new UpdateFaucetCoins(coins.reverse()));
      })
    });
  }

  ngOnDestroy() {
    this.txs$.unsubscribe();
  }

  onFaucetRequest(address) {
    if(address.length !== 39) {
      this.statusText = 'No input provided. Or provided input is invalid.'
      this.statusClass = 'alert-warning';
    } else {
      this.faucetService
        .postFaucet(`xrn:${address}`)
        .subscribe((tx:any) => {
          if(tx.hash) {
            this.statusText = `Success! Hash: ${tx.hash}`
            this.statusClass = 'alert-success';
          } else {
            this.statusText = `${tx.status}`
            this.statusClass = 'alert-danger';
          }
        });
    }
  }

  onStatusHide() {
    this.statusClass += ' d-none'
  }

}
