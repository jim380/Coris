import { Component, OnInit, Inject, ViewChildren, QueryList } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatTableDataSource, MatPaginator } from '@angular/material';

import { State } from 'src/app/interfaces/state.interface';

@Component({
  selector: 'app-validator',
  templateUrl: './validator.component.html',
  styleUrls: ['./validator.component.scss']
})

export class ValidatorComponent implements OnInit {
  appState: Observable<State>;

  validator;
  delegations;
  
  delegationsDataSource = new MatTableDataSource<any>([]);
  delegationsDisplayedColumns: string[] = ['address', 'amount'];

  @ViewChildren(MatPaginator) paginators = new QueryList<MatPaginator>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store <State>
    // private route: ActivatedRoute
  ) { 
    // let address = this.route.snapshot.paramMap.get('address');
    // console.log(address);
    this.validator = data.validator;
    console.log(data);
  }

  ngOnInit() {
    this.delegations = this.validator.delegations.sort((a, b) => { 
      return Number(b.shares)-Number(a.shares); 
    });

    this.appState = this.store.select('App');
    // this.sortedDelegations.forEach((delegant: any, index) => {
    //   console.log(index, delegant);
    // });
  } 

  ngAfterViewInit() {
    // this.delegationsDataSource.paginator = this.paginators.toArray()[0];
    this.initDelegationsTable();
  }

  public initDelegationsTable() {
    // TODO remove debugging
    // console.log(this.proposal.currentDeposit);
    this.delegationsDataSource = new MatTableDataSource<any>([...this.delegations]);
    this.delegationsDataSource.paginator = this.paginators.toArray()[0];
  }
}
