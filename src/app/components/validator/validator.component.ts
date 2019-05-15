import { Component, OnInit, Inject, ViewChildren, QueryList } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
// import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatTableDataSource, MatPaginator } from '@angular/material';

import { State } from 'src/app/interfaces/state.interface';
import { ToastrService } from 'ngx-toastr';
import { TxsService } from 'src/app/services/txs.service';

@Component({
  selector: 'app-validator',
  templateUrl: './validator.component.html',
  styleUrls: ['./validator.component.scss']
})

export class ValidatorComponent implements OnInit {
  appState: Observable<State>;

  validator;
  delegations;
  transactions = {
    staking: [],
    transfer: []
  };
  
  
  delegationsDataSource = new MatTableDataSource<any>([]);
  delegationsDisplayedColumns: string[] = ['address', 'amount'];

  accountDisplayedColumns: string[] = ['hash', 'height'];
  accountDataSource = new MatTableDataSource<any>([]);


  @ViewChildren(MatPaginator) paginators = new QueryList<MatPaginator>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store <State>,
    private ts: TxsService, 
    private toastr: ToastrService
    // private route: ActivatedRoute
  ) { 
    // let address = this.route.snapshot.paramMap.get('address');
    // TODO remove debugging
    // console.log(address);
    this.validator = data.validator;
    console.log(data);
  }

  ngOnInit() {
    this.appState = this.store.select('App');

    this.delegations = this.validator.delegations.sort((a, b) => { 
      return Number(b.shares)-Number(a.shares); 
    });
  } 

  ngAfterViewInit() {
    if(this.validator.account.value.address) {
      this.ts.getTxs(this.validator.account.value.address, 20, 1).subscribe((data: any) => {
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

}
