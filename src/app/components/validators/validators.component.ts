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
  styleUrls: ['./validators.component.scss'],
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

  optionsSelect: Array<any>;
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
      this.validatorsBondFilter(2);
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
      'rank',
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
      'rank',
      'moniker', 
      'status', 
      'weight', 
      'assets', 
      'delegators',
      'bond', 
      'commission'
    ];  
  }


  validatorsFilter(bondStatus, isJailed) {
    this.hideUnbondColumn();

    this.appState.subscribe(data => {
      // @aakatev remove debugging
      // console.log(data.validators);
      let filterSource = [];

      data.validators.forEach(validator => {
        if(validator.status === bondStatus && validator.jailed === isJailed) {
          filterSource.push(validator);
        }
      });
      this.dataSource = new MatTableDataSource<any>([...filterSource]);
    }).unsubscribe();
  }

  validatorsJailedFilter(isJailed) {
    this.hideUnbondColumn();

    this.appState.subscribe(data => {
      // @aakatev remove debugging
      // console.log(data.validators);
      let filterSource = [];

      data.validators.forEach(validator => {
        if(validator.jailed === isJailed) {
          filterSource.push(validator);
        }
      });
      this.dataSource = new MatTableDataSource<any>([...filterSource]);
    }).unsubscribe();
  }

  validatorsBondFilter(bondStatus) {
    this.appState.subscribe(data => {
      // @aakatev remove debugging
      // console.log(data.validators);
      let filterSource = [];
      bondStatus === 1 ? this.displayUnbondColumn() : this.hideUnbondColumn();
      
      data.validators.forEach(validator => {
        if(validator.status === bondStatus) {
          filterSource.push(validator);
        }
      });
      this.dataSource = new MatTableDataSource<any>([...filterSource]);
    }).unsubscribe();
  }

  validatorsNoFilter() {
    this.appState.subscribe(data => {
      this.hideUnbondColumn();
      // @aakatev remove debugging
      // console.log(data.validators);
      this.dataSource = new MatTableDataSource<any>([...data.validators]);
    }).unsubscribe();
  }
}
