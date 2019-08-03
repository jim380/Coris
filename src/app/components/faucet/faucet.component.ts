import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FaucetService } from 'src/app/services/faucet.service';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state';
import { selectTxs } from 'src/app/state/txs/txs.reducers';
import { selectFaucetState } from 'src/app/state/faucet/faucet.reducers';
import { first, map } from 'rxjs/operators';
import { UpdateFaucetCoins } from 'src/app/state/faucet/faucet.actions';
import { RecaptchaComponent } from 'ng-recaptcha';
import {MatDialog} from '@angular/material/dialog';
import { DialogContent } from './dialog/dialog-content';

@Component({
  selector: 'app-faucet',
  templateUrl: './faucet.component.html',
  styleUrls: ['./faucet.component.scss']
})
export class FaucetComponent implements OnInit, OnDestroy {
  sender: string|null = null;

  statusText: string = 'Read and accept our terms of use!';
  statusCanSend: boolean = false;
  statusSent: boolean = false;
  

  txsSize:number = 0;
  txs$ = this.appStore.select(selectTxs).subscribe(txs => this.txsSize = txs.length);
  faucet$ = this.appStore.select(selectFaucetState);



  @ViewChild('captchaRef', {static: false}) captchaRef: RecaptchaComponent;
  constructor(
    private faucetService: FaucetService,
    private appStore: Store<State>,
    public dialog: MatDialog
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

  openDialog() {
    const dialogRef = this.dialog.open(DialogContent, {
      height: 'auto',
      width: 'auto',
      panelClass: 'terms-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  resolved(captchaResponse: string) {
    // console.log(captchaResponse);
    this.faucetService
      .postFaucet(`xrn:${this.sender}`)
      .subscribe( 
        (tx:any) => {
          if(tx.hash) {
            this.statusText = `Success! Hash: ${tx.hash}. To send another tx refresh your browser!`;
          } else {
            this.statusText = `${tx.status}`
          }
        },
        (err) => 'Something went wrong! Please, refresh your browser, and try again.'
      );
  }

  onFaucetRequest(address) {
    if(address.length !== 39) {
      this.statusText = 'No input provided, or input is invalid.';
    } else {
      this.sender = address;

      this.statusSent = true;
      this.statusCanSend = false;
      this.statusText = 'Error on verification step! Please, refresh your browser, and try again.';

      this.captchaRef.execute();
    }
  }

  OnChange($event){
    // console.log($event); 
    this.statusCanSend = $event.checked;
  }

}
