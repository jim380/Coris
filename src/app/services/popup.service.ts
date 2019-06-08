import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State, AppState } from '../state/app.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { nodeRpc1 } from '../../config.js'
import { Block } from '../interfaces/block.interface';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material';

export class PopupConfig {
  public config = {
    data: null,      
    maxWidth: '100vw',
    maxHeight: '100vh',
    height: '100%',
    width: '100%',
  }
  constructor(data) {
    this.config.data = data;
  }
}

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  appState: Observable<State>;
  constructor(
    private appStore: Store<State>,
    private httpClient: HttpClient,
    private dialog: MatDialog
  ) {
    this.appState = this.appStore.select(state => state);
    console.log("new popup service created!");
  }

  openValidatorDialog(validator, component) {
    this.dialog.open( component, new PopupConfig({ validator: validator }).config );
  }

  openValidatorDialogAddr(validatorAddress, component) {
    this.appState.pipe(
      take(1)
    ).subscribe((state) => {
      let validatorQuery = state.validatorsState.validators
        .filter(val => val.operator_address === validatorAddress);
      if( validatorQuery.length === 1) {
        this.dialog.open( component, new PopupConfig({ validator: validatorQuery[0] }).config);
      } else {
        console.log("Validator was not found! Operator address: ", validatorAddress)
      }
    });
  }

  openValidatorDialogAddrHEX(validatorAddressHEX, component) {
    this.appState.pipe(
      take(1)
    ).subscribe((state) => {
      let validatorQuery = state.validatorsState.validators
        .filter(val => val.description.moniker === state.appState.valsMap.get(validatorAddressHEX));
      if( validatorQuery.length === 1) {
        this.dialog.open( component, new PopupConfig({ validator: validatorQuery[0] }).config);
      } else {
        console.log("Validator was not found! HEX address: ", validatorAddressHEX)
      }
    });
  }

  openValidatorDialogMoniker(moniker, component) {
    this.appState.pipe(
      take(1)
    ).subscribe((state) => {
      let validatorQuery = state.validatorsState.validators
        .filter( val => (val.description.moniker.replace(/\W/g, '').toLowerCase()).includes(moniker.replace(/\W/g, '').toLowerCase()) );
      if( validatorQuery.length === 1) {
        this.dialog.open( component, new PopupConfig({ validator: validatorQuery[0] }).config);
      } else {
        console.log("Validator was not found! Moniker: ", moniker)
      }
    });
  }

  openAccountDialogAddr(delegatorAddress, component) {
    this.dialog.open( component,  new PopupConfig({ address: delegatorAddress }).config);
  }

  openTxDialogHash(txHash, component) {
    let tx;
    this.httpClient.get(`${nodeRpc1}/txs/${txHash}`).subscribe((data:any) => {
      tx = {
        hash: data.txhash, 
        height: data.height,
        gasUsed: data.gasUsed,
        gasWanted: data.gasWanted,
        details: data,
        fee: data.tx.value.fee,
        memo: data.tx.value.memo,
        msg: data.tx.value.msg,
        error: null,
        action: []
      };

      if(data.tags) {
        let index = 0;
        data.tags.forEach((tag:any) => {
          // TODO remove debugging
          // console.log(tag);
          if(tag.key === 'action') {
            tx.action[index] = tag.value.replace(/_/g, ' ');
            index += 1;
          }
        });
      }
      // END LOGIC FOR NOT-FAULTY  

      if(data.code === 12) {
        // TODO remove debugging
        // console.log(data);
        // tx['action'] = "out of gas";
        tx.error = "out of gas";
      } else if (data.code === 104) {
        tx.error = "no delegation distribution info";
        // TODO remove debugging
        // console.log(data);
      } else if (data.code === 10) {
        tx.error = "insufficient account funds";
        // TODO remove debugging
        // console.log(data);
      } else if (data.code === 102) {
        tx.error = "no delegation for this (address, validator) pair";
        // TODO remove debugging
        // console.log(data);
      } else if (data.code) {
        // TODO @aakatev find more failed tx codes
        tx.error = "TEST"
        console.log(data);
      }
    },
    err => {
      // @aakatev some txs cause 500 errors
      // otherwise would dump code in console
      // console.log(err);
    },
    () => {
      // TODO remove debugging
      // console.log(tx);
      this.dialog.open( component,  new PopupConfig({ tx: tx }).config);
    });
  }

  openTxDialog(tx, component) {
    this.dialog.open(component, new PopupConfig({ tx: tx }).config);
  }

  openBlockDialogHeight(blockHeight, component) {
    let block: Block;
    this.httpClient.get(`${nodeRpc1}/blocks/${blockHeight}`).subscribe((data:any) => {
      // TODO remove debugging
      // console.log(data);
      const datePipe = new DatePipe('en-US');
      const formattedTime = datePipe.transform(data.block_meta.header.time, 'h:mm:ss a, MMM d, y');
      block = {
        hash: data.block_meta.block_id.hash, 
        height: data.block_meta.header.height, 
        time: formattedTime,
        txs: data.block_meta.header.num_txs,
        proposer: data.block_meta.header.proposer_address
      }   
    },
    (error) => {
    },
    () => {
      this.dialog.open( component,  new PopupConfig({ block: block }).config);
    });
  }

  openBlockDialog(block, component) {
    this.dialog.open( component,  new PopupConfig({ block: block }).config);
  }

 
  openGovDetailDialog(proposal, component) {
    this.dialog.open( component, new PopupConfig({ proposal: proposal }).config);
  }
}
