import { Component, OnInit, Inject, ViewChildren, QueryList } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Store } from '@ngrx/store';
// import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';

import { ToastrService } from 'ngx-toastr';
import { TxsService } from 'src/app/services/txs.service';
import { AppState, State } from 'src/app/state/app.interface';
import { selectAppState } from 'src/app/state/app.reducers';
import { ActivatedRoute } from '@angular/router'
import { PopupService } from 'src/app/services/popup.service';
import { AccountDetailComponent } from '../account-detail/account-detail.component';

@Component({
  selector: 'app-validator',
  templateUrl: './validator.component.html',
  styleUrls: ['./validator.component.scss']
})

export class ValidatorComponent implements OnInit {
  appState: Observable<AppState>;

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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private appStore: Store <State>,
    private ts: TxsService, 
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private popupService: PopupService,
    private dialog: MatDialog
  ) { 
    // let address = this.route.snapshot.paramMap.get('address');
    // TODO remove debugging
    // console.log(address);
    this.validator = data.validator;
    console.log(data);
  }

  ngOnInit() {
    this.appState = this.appStore.select(selectAppState);

    this.delegations = this.validator.delegations.sort((a, b) => { 
      return Number(b.shares)-Number(a.shares); 
    });

    this.user = {
      address: this.route.snapshot.params['address']
    };
  } 

  ngAfterViewInit() {
    if(this.validator.account.value.address) {
      this.ts.getTransferTxs(this.validator.account.value.address, 100, 1).subscribe((data: any) => {
        // TODO remove debugging
        // console.log(data);
        this.transactions.transfer = data;
      });
  
      this.ts.getStakingTxs(this.validator.account.value.address).subscribe((data: any) => {
        // TODO remove debugging
        // console.log(data);
        this.transactions.staking = data;
        this.initAccountTable(data);
      });
    }   
    this.initDelegationsTable();
  }

  public initDelegationsTable() {
    // TODO remove debugging
    // console.log(this.proposal.currentDeposit);
    this.delegationsDataSource = new MatTableDataSource<any>([...this.delegations]);
    this.delegationsDataSource.paginator = this.paginators.toArray()[0];
  }

  public onTabChange(event) {
    let tabLabel = event.tab.textLabel.toLowerCase();
    this.initAccountTable( this.transactions[tabLabel] );
    // TODO remove debugging 
    // console.log( tabLabel );
  }

  public initAccountTable(array) {
    this.accountDataSource = new MatTableDataSource<any>([...array]);
    this.accountDataSource.paginator = this.paginators.toArray()[1];
  }

  public onCopySuccess() {
    this.toastr.success('Copied to clipboard');
  }

  public openDelegatorDialog(address) {
    console.log(address)
    this.popupService.openAccountDialogAddr(address, this.dialog, AccountDetailComponent);
  }

}
