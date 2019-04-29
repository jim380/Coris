import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { ValidatorsService } from '../../services/validators.service';
import { Sort, MatDialog } from '@angular/material';
import { ValidatorComponent } from '../validator/validator.component';
import { State } from 'src/app/interfaces/state.interface';
import { DataSource } from '@angular/cdk/table';
import {MatTable} from '@angular/material';

@Component({
  selector: 'app-validators',
  templateUrl: './validators.component.html',
  styleUrls: ['./validators.component.css']
})
export class ValidatorsComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<any>;
  appState: Observable<State>;
  valsUptime: Map<string,string> = new Map;
  totalTokens = 0;
  validators$;
  dataSource=[];
  displayedColumns: string[] = [
    'moniker', 
    'status', 
    'weight', 
    'assets', 
    'delegators',
    'bond', 
    'unbond', 
    // 'blockTime',
    'commission'
  ];

  constructor(
    private store: Store<State>, 
    private validatorsService: ValidatorsService,
    private dialog: MatDialog) { }
  
  openDialog(validator) {
    // @aakatev TODO 
    // create service to get this data 
    let totalTokens = 0;
    // TODO remove debugging
    // console.log(validator);
    this.dataSource.forEach(val => {
      totalTokens += Number(val.tokens);
    })
    // TODO remove debugging
    // console.log(tokens);
    this.dialog.open( ValidatorComponent,  {
      data: { 
        validator,
        totalTokens
      }
    });
  }

  ngOnInit() {
    this.appState = this.store.select('App');
    this.validators$ = this.appState.subscribe(data => {
      this.dataSource = [...data.validators];
      if(this.validators$ && data.validators.length > 0) {
        this.validators$.unsubscribe();
      }
    });
  }

  sortData(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      return;
    }

    const isAsc = sort.direction === 'asc';
    switch (sort.active) {
      case 'weight': { 
        this.sortValidatorsNumber('tokens', isAsc); 
        this.table.renderRows();
        break;
      }
      case 'name': {
        this.sortValidatorsString('moniker',isAsc);
        this.table.renderRows();
        break;        
      } 
      default: 0;
    }
  }

  sortValidatorsNumber(property, direction) {
    this.dataSource.sort((a, b) =>
      direction ? parseFloat(b[property]) - parseFloat(a[property]) : parseFloat(b[property]) + parseFloat(a[property])
    );
    // @aakatev remove debugging
    // console.log(this.dataSource);
  }

  // @aakatev FIX
  // sorting by string(aka text) doesnt work
  sortValidatorsString(property, direction) {
    this.dataSource.sort((a, b) =>
      direction ?
      b['description'][property] - a['description'][property] :
      a['description'][property] - b['description'][property]
    );
    // @aakatev remove debugging
    console.log(this.dataSource);
  }

  validatorsFilter(bondStatus, isJailed) {
    this.appState.subscribe(data => {
      // @aakatev remove debugging
      // console.log(data.validators);
      this.dataSource = [];

      data.validators.forEach(validator => {
        if(validator.status === bondStatus && validator.jailed === isJailed) {
          this.dataSource.push(validator);
        }
      });
    }).unsubscribe();
  }

  validatorsJailedFilter(isJailed) {
    this.appState.subscribe(data => {
      // @aakatev remove debugging
      // console.log(data.validators);
      this.dataSource = [];

      data.validators.forEach(validator => {
        if(validator.jailed === isJailed) {
          this.dataSource.push(validator);
        }
      });
    }).unsubscribe();
  }

  validatorsBondFilter(bondStatus) {
    this.appState.subscribe(data => {
      // @aakatev remove debugging
      // console.log(data.validators);
      this.dataSource = [];

      data.validators.forEach(validator => {
        if(validator.status === bondStatus) {
          this.dataSource.push(validator);
        }
      });
    }).unsubscribe();
  }

  validatorsNoFilter() {
    this.appState.subscribe(data => {
      // @aakatev remove debugging
      // console.log(data.validators);
      this.dataSource = data.validators;
    }).unsubscribe();
  }
}
