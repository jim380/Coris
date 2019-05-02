import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { ValidatorsService } from '../../services/validators.service';
import { Sort, MatDialog, MatSort } from '@angular/material';
import { ValidatorComponent } from '../validator/validator.component';
import { State } from 'src/app/interfaces/state.interface';
import {MatTable} from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-validators',
  templateUrl: './validators.component.html',
  styleUrls: ['./validators.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ValidatorsComponent implements OnInit {
  // Mat-table
  private dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  private displayedColumns: string[] = [];
  private paginator: MatPaginator;
  private sort: MatSort;
  private expandedElement: any | null;


  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }
  
  appState: Observable<State>;
  valsUptime: Map<string,string> = new Map;
  totalTokens = 0;
  validators$;
  
  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (data, sortHeaderId: any) => {
      return this.getPropertyByPath(data, sortHeaderId);
    };
  }

  getPropertyByPath(obj: Object, pathString: string) {
    return pathString.split('.').reduce((o, i) => o[i], obj);
  }

  constructor(
    private store: Store<State>, 
    private validatorsService: ValidatorsService,
    private dialog: MatDialog
  ) { 
    this.hideUnbondColumn();
  }

  ngOnInit() {
    if(this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
    
    this.appState = this.store.select('App');
    this.validators$ = this.appState.subscribe(data => {
      this.dataSource = new MatTableDataSource<any>([...data.validators]);
      // @aakatev remove debugging
      // console.log(this.dataSource);

      if(this.validators$ && data.validators.length > 0) {
        // console.log('Unsubscribed');
        this.validators$.unsubscribe();
      }
    });
    
  }
  
  openDialog(validator) {
    this.dialog.open( ValidatorComponent,  {
      data: { 
        validator
      }
    });
  }

  displayUnbondColumn() {
    this.displayedColumns = [
      'moniker', 
      'status', 
      'weight', 
      'assets', 
      'delegators',
      'bond', 
      'unbond', 
      'commission'
    ];  
  }

  hideUnbondColumn() {
    this.displayedColumns = [
      'moniker', 
      'status', 
      'weight', 
      'assets', 
      'delegators',
      'bond', 
      'commission'
    ];  
  }

  // sortData(sort: Sort) {
  //   if (!sort.active || sort.direction === '') {
  //     return;
  //   }

  //   const isAsc = sort.direction === 'asc';
  //   switch (sort.active) {
  //     case 'weight': { 
  //       this.sortValidatorsNumber('tokens', isAsc); 
  //       this.table.renderRows();
  //       break;
  //     }
  //     case 'name': {
  //       this.sortValidatorsString('moniker',isAsc);
  //       this.table.renderRows();
  //       break;        
  //     } 
  //     default: 0;
  //   }
  // }

  // sortValidatorsNumber(property, direction) {
  //   this.dataSource.sort((a, b) =>
  //     direction ? parseFloat(b[property]) - parseFloat(a[property]) : parseFloat(b[property]) + parseFloat(a[property])
  //   );
  //   // @aakatev remove debugging
  //   // console.log(this.dataSource);
  // }

  // // @aakatev FIX
  // // sorting by string(aka text) doesnt work
  // sortValidatorsString(property, direction) {
  //   this.dataSource.sort((a, b) =>
  //     direction ?
  //     b['description'][property] - a['description'][property] :
  //     a['description'][property] - b['description'][property]
  //   );
  //   // @aakatev remove debugging
  //   console.log(this.dataSource);
  // }

  // validatorsFilter(bondStatus, isJailed) {
  //   this.hideUnbondColumn();

  //   this.appState.subscribe(data => {
  //     // @aakatev remove debugging
  //     // console.log(data.validators);
  //     this.dataSource = [];

  //     data.validators.forEach(validator => {
  //       if(validator.status === bondStatus && validator.jailed === isJailed) {
  //         this.dataSource.push(validator);
  //       }
  //     });
  //   }).unsubscribe();
  // }

  // validatorsJailedFilter(isJailed) {
  //   this.hideUnbondColumn();

  //   this.appState.subscribe(data => {
  //     // @aakatev remove debugging
  //     // console.log(data.validators);
  //     this.dataSource = [];

  //     data.validators.forEach(validator => {
  //       if(validator.jailed === isJailed) {
  //         this.dataSource.push(validator);
  //       }
  //     });
  //   }).unsubscribe();
  // }

  // validatorsBondFilter(bondStatus) {
  //   this.appState.subscribe(data => {
  //     // @aakatev remove debugging
  //     // console.log(data.validators);
  //     this.dataSource = [];
  //     bondStatus === 1 ? this.displayUnbondColumn() : this.hideUnbondColumn();
      
  //     data.validators.forEach(validator => {
  //       if(validator.status === bondStatus) {
  //         this.dataSource.push(validator);
  //       }
  //     });
  //   }).unsubscribe();
  // }

  validatorsNoFilter() {
    this.appState.subscribe(data => {
      this.hideUnbondColumn();

      // @aakatev remove debugging
      // console.log(data.validators);
      this.dataSource = data.validators;
    }).unsubscribe();
  }
}
