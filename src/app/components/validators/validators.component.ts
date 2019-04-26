import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { ValidatorsService } from '../../services/validators.service';
import { Sort, MatDialog } from '@angular/material';
import { ValidatorComponent } from '../validator/validator.component';
import { State } from 'src/app/interfaces/state.interface';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-validators',
  templateUrl: './validators.component.html',
  styleUrls: ['./validators.component.css']
})
export class ValidatorsComponent implements OnInit {
  appState: Observable<State>;
  valsUptime: Map<string,string> = new Map;
  totalTokens = 0;

  validators$;
  dataSource=[];
  swapDataSource=[];
  displayedColumns: string[] = [
    'moniker', 
    'status', 
    'weight', 
    'assets', 
    'delegators',
    'bond', 
    'unbond', 
    'blockTime',
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
      case 'weight': return this.validatorsService.sortValidatorsNumber('tokens', isAsc);;
      case 'name': return this.validatorsService.sortValidatorsString('moniker',isAsc);
      default: return 0;
    }
  }

  sortBy(parameter, isAsc) {
    this.validatorsService.sortValidatorsNumber(parameter, isAsc);
  }

  statusFilter(status) {
    this.appState.subscribe(data => {
      console.log(data.validators);
      this.dataSource = [];

      data.validators.forEach(validator => {
        if(validator.status === status) {
          this.dataSource.push(validator);
        }
      });

    }).unsubscribe();

    
    // this.swapDataSource = this.dataSource;
    // this.dataSource = [];
    // this.swapDataSource.forEach(data => {
    //   if(data.status === status) {
    //     this.dataSource.push(data);
    //   }
    // });
  }
}
