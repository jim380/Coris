import { Component, OnInit, Inject, ViewChildren, QueryList } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, MatDialogRef, MatCard } from '@angular/material';

import { ToastrService } from 'ngx-toastr';
import { TxsService } from 'src/app/services/txs.service';
import { State } from 'src/app/state';
import { selectValidatorsState } from 'src/app/state/validators/validators.reducers';
import { ValidatorsState } from 'src/app/state/validators/validator.interface';

@Component({
  selector: 'app-validator',
  templateUrl: './validator.component.html',
  styleUrls: [
    './validator.component.scss',
    '../popups-common.scss'
  ]
})

export class ValidatorComponent implements OnInit {
  validatorsState: Observable<ValidatorsState>;

  validator;
  delegations;
  transactions = {
    staking: [],
    transfer: []
  };
  
  user: {address: string};

  delegationsDataSource = new MatTableDataSource<any>([]);
  delegationsDisplayedColumns: string[] = ['address', 'amount'];

  accountDisplayedColumns: string[] = ['hash', 'height'];
  accountDataSource = new MatTableDataSource<any>([]);


  @ViewChildren(MatPaginator) paginators = new QueryList<MatPaginator>();
  @ViewChildren(MatCard) matCards = new QueryList<MatCard>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private appStore: Store <State>,
    private ts: TxsService, 
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<ValidatorComponent>,
    
  ) { 
    this.validator = data.validator;
  }

  ngOnInit() {
    this.validatorsState = this.appStore.select(selectValidatorsState);

    this.delegations = this.validator.delegations.sort((a, b) => { 
      return Number(b.shares)-Number(a.shares); 
    });
  } 

  ngAfterViewInit() {
    if(this.validator.account.value.address) {
      this.ts.getTransferTxs(this.validator.account.value.address, 100, 1).subscribe((data: any) => {
        this.transactions.transfer = data;
      });
  
      this.ts.getStakingTxs(this.validator.account.value.address).subscribe((data: any) => {
        this.transactions.staking = data;
        this.initAccountTable(data);
      });
    }   
    this.initDelegationsTable();
    console.log(this.matCards);
  }

  public initDelegationsTable() {
    this.delegationsDataSource = new MatTableDataSource<any>([...this.delegations]);
    this.delegationsDataSource.paginator = this.paginators.toArray()[0];
  }

  public onTabChange(event) {
    let tabLabel = event.tab.textLabel.toLowerCase();
    this.initAccountTable( this.transactions[tabLabel] );
  }

  public initAccountTable(array) {
    this.accountDataSource = new MatTableDataSource<any>([...array]);
    this.accountDataSource.paginator = this.paginators.toArray()[1];
  }

  public onCopySuccess() {
    this.toastr.success('Copied to clipboard');
  }

  public openDelegatorDialog(address) {
    this.dialogRef.close();
    this.data.service.openAccountDialogAddr(address);
  }

  public openTxDialog(hash) {
    this.dialogRef.close();
    this.data.service.openTxDialogHash(hash);
  }

}
