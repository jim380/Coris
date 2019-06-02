import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State, AppState } from '../state/app.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { nodeRpc1 } from '../../config.js'
import { Block } from '../interfaces/block.interface';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
  // providedIn: null
})
export class PopupService {
  appState: Observable<State>;
  constructor(
    private appStore: Store<State>,
    private httpClient: HttpClient
  ) {
    this.appState = this.appStore.select(state => state);
    console.log("new popup service created!");
  }

  openValidatorDialog(validator, dialog, component) {
    console.log(validator);
    dialog.open( component,  {
      data: { 
        validator
      },
      height: '75vh',
    });
  }

  openValidatorDialogAddr(validatorAddress, dialog, component) {
    // console.log(validatorAddress);
    this.appState.pipe(
      take(1)
    ).subscribe((state) => {
      let validatorQuery = state.validatorsState.validators
        .filter(val => val.operator_address === validatorAddress);
      if( validatorQuery.length === 1) {
        dialog.open( component,  {
          data: { 
            validator: validatorQuery[0]          },
          height: '75vh',
        });
      } else {
        console.log("Validator was not found! Operator address: ", validatorAddress)
      }
    });
  }

  openValidatorDialogAddrHEX(validatorAddressHEX, dialog, component) {
    console.log(validatorAddressHEX);
    this.appState.pipe(
      take(1)
    ).subscribe((state) => {
      let validatorQuery = state.validatorsState.validators
        .filter(val => val.description.moniker === state.appState.valsMap.get(validatorAddressHEX));
      if( validatorQuery.length === 1) {
        dialog.open( component,  {
          data: { 
            validator: validatorQuery[0]          },
          height: '75vh',
        });
      } else {
        console.log("Validator was not found! HEX address: ", validatorAddressHEX)
      }
    });
  }

  openValidatorDialogMoniker(moniker, dialog, component) {
    // console.log(moniker);
    this.appState.pipe(
      take(1)
    ).subscribe((state) => {
      let validatorQuery = state.validatorsState.validators
        .filter( val => (val.description.moniker.replace(/\W/g, '').toLowerCase()).includes(moniker.replace(/\W/g, '').toLowerCase()) );
      if( validatorQuery.length === 1) {
        dialog.open( component,  {
          data: { 
            validator: validatorQuery[0]          },
          height: '75vh',
        });
      } else {
        console.log("Validator was not found! Moniker: ", moniker)
      }
    });
  }

  openAccountDialogAddr(delegatorAddress, dialog, component) {
    dialog.open( component,  {
      data: { 
        address: delegatorAddress
      },
      height: '75vh'
    });
  }

  openTxDialog(txHash, dialog, component) {
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
      dialog.open( component,  {
        data: { 
          tx
        },
        height: '75vh'
      });
    });
  }

  openBlockDialog(blockHeight, dialog, component) {
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
      dialog.open( component,  {
        data: { 
          block
        },
        height: '75vh'
      });
    });
  }
}
