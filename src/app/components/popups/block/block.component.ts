import { Component, OnInit, Inject, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, range } from 'rxjs';
import { MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { TxsService } from 'src/app/services/txs.service';
import { ValidatorsState } from 'src/app/state/validators/validator.interface';
import { selectValidatorsState } from 'src/app/state/validators/validators.reducers';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: [
    './block.component.scss',
    '../popups-common.scss'
  ]
})

export class BlockComponent implements OnInit, AfterViewInit {
  validatorsState: Observable<ValidatorsState>;
  block;
  txs = [];

  txsDataSource = new MatTableDataSource<any>([]);
  txsDisplayedColumns: string[] = ['hash', 'type'];
  @ViewChildren(MatPaginator) paginators = new QueryList<MatPaginator>();

  constructor(
    public dialogRef: MatDialogRef<BlockComponent>,
    private appStore: Store <ValidatorsState>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ts: TxsService,
    private toastr: ToastrService,
  ) { 
    // TODO remove debugging
    // console.log(data.block);
    this.block = data.block;
  }

  ngOnInit() {
    this.validatorsState = this.appStore.select(selectValidatorsState);
    this.initTxs();
  }

  ngAfterViewInit() {
    // TOFIX paginator bug
    // this.txsDataSource.paginator = this.paginators.toArray()[0];
    // console.log(this.paginators);
  }

  private initTxs() {
    this.ts.getTxsAtBlock(this.block.height).subscribe((data:any) => {
      data.result.txs.forEach((tx: any, index) => {
        this.initTx(tx.hash);
      },
      (error) => {
        console.log('error', error);
      },
      () => {
        console.log("resolved something");
      });
    });
    // this.initTable('All');
  }

  private initTx(hash) {
    let tx;
    this.ts.getTxByHash(hash).subscribe((data:any) => {
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
    (error) => {
      console.log('error', error);
    },
    () => {
      // TODO remove debugging
      this.txs.push(tx);
      this.initTable('All');
      console.log(this.txs);
    });
  }

  public initTable(filter) {
    this.txsDataSource = new MatTableDataSource<any>([...this.txs]);
    this.txsDataSource.filterPredicate = (data: any, filter: string) => !filter || data.option == filter;
    if(filter !== 'All') {
      this.txsDataSource.filter = filter;
    }
  }

  public onTabChange(event) {
    // TODO remove debugging
    console.log(event.tab.textLabel);
  }

  openTxDialog(tx) {
    this.dialogRef.close();
    this.data.service.openTxDialog(tx);
  }


  openValidatorDialog(addressHEX) {
    this.dialogRef.close();
    this.data.service.openValidatorDialogAddrHEX(addressHEX);
  }

  onCopySucceess() {
    this.toastr.success('Copied to clipboard');
  }
}

