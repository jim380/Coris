import { Injectable } from '@angular/core';
import { take, skipWhile, map, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Observable, forkJoin, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { nodeRpc1 } from '../../config.js'
import { Block } from '../interfaces/block.interface';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material';
import { ValidatorComponent } from '../components/popups/validator/validator.component';
import { AccountDetailComponent } from '../components/popups/account-detail/account-detail.component';
import { TxComponent } from '../components/popups/tx/tx.component';
import { BlockComponent } from '../components/popups/block/block.component';
import { GovDetailComponent } from '../components/popups/gov-detail/gov-detail.component';
import { State } from '../state/index.js';
import { ValidatorsState } from '../state/validators/validator.interface.js';
import { selectValidatorsState } from '../state/validators/validators.reducers.js';

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
    console.log('New popup service inited!');
  }
}

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  validatorsState$: Observable<ValidatorsState>;

  constructor(
    private appStore: Store<State>,
    private httpClient: HttpClient,
    private dialog: MatDialog
  ) {
    this.validatorsState$ = this.appStore.select(selectValidatorsState);
    console.log("new popup service created!");
  }

  openValidatorDialog(validator) {
    this.dialog.open( ValidatorComponent, new PopupConfig({ validator: validator }).config );
  }

  openValidatorDialogAddr(validatorAddress) {
    this.validatorsState$.pipe(
      skipWhile(state => state.validators.length === 0),
      take(1)
    ).subscribe((state) => {
      let validatorQuery = state.validators
                            .filter(validator => 
                              validator.operator_address === validatorAddress
                            );
      if( validatorQuery.length === 1) {
        this.dialog.open( ValidatorComponent, new PopupConfig({ validator: validatorQuery[0] }).config);
      } else {
        console.log("Validator was not found! Operator address: ", validatorAddress)
      }
    });
  }

  openValidatorDialogAddrHEX(validatorAddressHEX) {
    this.validatorsState$.pipe(
      skipWhile(state => state.validators.length === 0),
      take(1)
    ).subscribe((state) => {
      let validatorQuery = state.validators
                            .filter(validator => 
                              validator.description.moniker === state.validatorsMap.get(validatorAddressHEX)
                            );
      if( validatorQuery.length === 1) {
        this.dialog.open( ValidatorComponent, new PopupConfig({ validator: validatorQuery[0] }).config);
      } else {
        console.log("Validator was not found! HEX address: ", validatorAddressHEX)
      }
    });
  }

  openValidatorDialogMoniker(moniker) {
    this.validatorsState$.pipe(
      skipWhile(state => state.validators.length === 0),
      take(1)
    ).subscribe((state) => {
      let validatorQuery = state.validators
                            .filter( validator => 
                              (validator.description.moniker
                                .replace(/\W/g, '')
                                .toLowerCase()
                              )
                              .includes(
                                moniker
                                  .replace(/\W/g, '')
                                  .toLowerCase()
                              ) 
                            );
      if( validatorQuery.length === 1) {
        this.dialog.open( ValidatorComponent, new PopupConfig({ validator: validatorQuery[0] }).config);
      } else {
        console.log("Validator was not found! Moniker: ", moniker)
      }
    });
  }

  openAccountDialogAddr(delegatorAddress) {
    this.dialog.open( AccountDetailComponent,  new PopupConfig({ address: delegatorAddress }).config);
  }

  openTxDialogHash(txHash) {
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
        tx.error = "out of gas";
      } else if (data.code === 104) {
        tx.error = "no delegation distribution info";
      } else if (data.code === 10) {
        tx.error = "insufficient account funds";
      } else if (data.code === 102) {
        tx.error = "no delegation for this (address, validator) pair";
      } else if (data.code) {
        // TODO @aakatev find more failed tx codes
        tx.error = "TEST"
        console.log(data);
      }
    },
    err => { },
    () => {
      this.dialog.open( TxComponent,  new PopupConfig({ tx: tx }).config);
    });
  }

  openTxDialog(tx) {
    this.dialog.open(TxComponent, new PopupConfig({ tx: tx }).config);
  }

  openBlockDialogHeight(blockHeight) {
    let block: Block;
    this.httpClient.get(`${nodeRpc1}/blocks/${blockHeight}`).subscribe((data:any) => {
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
      this.dialog.open( BlockComponent,  new PopupConfig({ block: block }).config);
    });
  }

  openBlockDialog(block) {
    this.dialog.open( BlockComponent,  new PopupConfig({ block: block }).config);
  }

 
  openGovDetailDialog(proposal) {
    forkJoin(
      this.httpClient.get(`${nodeRpc1}/gov/proposals/${proposal.proposal_id}/proposer`).pipe(catchError(error => of(null))),
      this.httpClient.get(`${nodeRpc1}/gov/proposals/${proposal.proposal_id}/deposits`).pipe(catchError(error => of([]))),
      this.httpClient.get(`${nodeRpc1}/gov/proposals/${proposal.proposal_id}/votes`).pipe(catchError(error => of([])))
    ).subscribe(([ proposer, deposits, votes ]) => {
      proposal.proposer = proposer;
      proposal.currentDeposit = deposits === null ? [] : deposits;
      proposal.currentVotes = votes === null ? [] : votes;
      this.dialog.open( GovDetailComponent, new PopupConfig({ proposal: proposal }).config);
    })
  }

  openGovDetailDialogId(proposalId) {
    forkJoin(
      this.httpClient.get(`${nodeRpc1}/gov/proposals/${proposalId}`).pipe(catchError(error => of(null))),
      this.httpClient.get(`${nodeRpc1}/gov/proposals/${proposalId}/tally`).pipe(catchError(error => of(null))),
    ).subscribe( ([ proposal, tally ]) => {
      if (proposal) {
        this.openGovDetailDialog({
          proposal_id: proposal.proposal_id,
          proposal_status: proposal.proposal_status === "VotingPeriod" ? "Voting Period" : proposal.proposal_status,
          submit_time: proposal.submit_time,
          deposit_end_time: proposal.deposit_end_time,
          proposal_content: proposal.proposal_content,
          total_deposit: proposal.total_deposit,
          voting_end_time: proposal.voting_end_time,
          voting_start_time: proposal.voting_start_time,
          currentTally: tally,
        });
      }
    })
  }
}
