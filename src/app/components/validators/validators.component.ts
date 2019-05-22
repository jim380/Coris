import { TestComponent } from './../test/test.component';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { Store, createFeatureSelector, createSelector, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
// import { ValidatorsService } from '../../services/validators.service';
import { ValidatorsHelperService } from '../../services/validators-helper.service';
import { Sort, MatDialog, MatSort } from '@angular/material';
import { ValidatorComponent } from '../validator/validator.component';
import { State } from 'src/app/interfaces/state.interface';
import {MatTable} from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { ProfileCardComponent } from '../validator-profile/profile-card/profile-card.component';
// import { GovDetailComponent } from '../governance/gov-detail/gov-detail.component';
import { MetricsCardComponent } from '../validator-profile/metrics-card/metrics-card.component';
import { AddressCardComponent } from '../validator-profile/address-card/address-card.component';
import { RewardsCardComponent } from '../validator-profile/rewards-card/rewards-card.component';
import { DelegatorCardComponent } from '../validator-profile/delegator-card/delegator-card.component';
import { PowerEventCardComponent } from '../validator-profile/power-event-card/power-event-card.component'
import { ProposedBlocksCardComponent } from '../validator-profile/proposed-blocks-card/proposed-blocks-card.component'
import { map } from 'rxjs/operators';

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
  ]
})
export class ValidatorsComponent implements OnInit, AfterViewInit {
  public statusChartOptions: any = {
    responsive: true
  };

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

  constructor(
    private store: Store<State>, 
    private dialog: MatDialog,
    private validatorsHelperService: ValidatorsHelperService
  ) { 
    // this.hideUnbondColumn();
  }


  ngOnInit() {
    this.appState = this.store.select('App');

    // this.appState.subscribe((data: any) => {
    //   console.log(data);
    // });

    let validators$ = this.store.select('Validators');
    
    validators$.pipe(
      map(state => state.validators)
    ).subscribe((data:any) => {
      this.dataSource = new MatTableDataSource<any>([...data]);
      this.setDataSourceAttributes();
      // TODO remove debugging
      console.log(data);
    });
  }

  ngAfterViewInit() {
    this.setDataSourceAttributes();
  }
  
  /* MAT TABLE SECTION */
  private dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  private paginator: MatPaginator;
  private sort: MatSort;

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
      case 'rank': return item.rank;
      case 'moniker': return item.description.moniker;
      case 'tokens': return Number(item.tokens);
      case 'balance': return item.distribution ? item.distribution.balance.amount : 0;
      case 'delegations': return item.delegations ? item.delegations.length : 0;
      case 'self_bond': return item.self_bond ? item.self_bond : 0;
      case 'commission': return item.commission.rate;
      default: return item[property];
      }
    }

    // TOFIX @aakatev
    // Super hacky way to check, but works
    if( this.tableFilterState.length > 7 ) {
      this.dataSource.filterPredicate = function(data, filter): boolean {
        let parsedFilter = JSON.parse(filter);
        return data.status === Number( parsedFilter.status )
               && data.jailed === parsedFilter.jailed;
      };
    } else {
      this.dataSource.filterPredicate = function(data, filter): boolean {
        return data.status === Number(filter) || data.jailed === filter;
      };      
    }
    this.dataSource.filter = this.tableFilterState;
  }
  
  /* COLUMNS UPDATE LOGIC */
  displayUnbondColumn:any = false;

  displayedColumns = [
    { 
      bond: true,
      column: 'rank'
    },
    { 
      bond: true,
      column: 'moniker'
    },
    { 
      bond: true,
      column: 'weight'
    },
    // { 
    //   bond: true,
    //   column: 'status'
    // },
    { 
      bond: true,
      column: 'assets'
    },
    { 
      bond: true,
      column: 'delegators'
    },
    { 
      bond: false,
      column: 'unbond'
    },
    { 
      bond: true,
      column: 'bond'
    },
    { 
      bond: true,
      column: 'commission'
    }
  ];
 
  getDisplayedColumns(): string[] {
    return this.displayedColumns
            .filter(columns => columns.bond || this.displayUnbondColumn)
            .map(columns => columns.column);
  }
  
  /* END COLUMNS UPDATE LOGIC */

  /* TABLE FILTERING */
  // TODO @aakatev 
  // Rewrite with observable as a state
  tableFilterState:any = "";
  tableFilterButtonLabel:string = "All";

  validatorsJailedFilter(isJailed) {
    this.displayUnbondColumn = false;
    this.tableFilterButtonLabel = "Jailed";
    this.tableFilterState = isJailed;
    this.setDataSourceAttributes();
  }

  validatorsBondFilter(bondStatus) {
    this.displayUnbondColumn = ( bondStatus === 1 ) ? true : false;
    this.tableFilterButtonLabel = ( bondStatus === 1 ) ? "Unbonding" : "Bonded";
    this.tableFilterState = bondStatus;
    this.setDataSourceAttributes();
  }

  validatorsBondJailedFilter(bondStatus, isJailed) {
    this.tableFilterButtonLabel = "Unbonded";
    this.displayUnbondColumn = ( bondStatus === 1 ) ? true : false;
    this.tableFilterState = JSON.stringify({ status: bondStatus, jailed: isJailed });
    this.setDataSourceAttributes();
  }

  validatorsNoFilter() {
    this.displayUnbondColumn = false;
    this.tableFilterButtonLabel = "All"; 
    this.tableFilterState = "";
    this.setDataSourceAttributes();
  }
  /* END TABLE FILTERING */
  /* END MAT TABLE SECTION */

  /* POPUPS */
  openValidatorDialog(validator) {
    this.dialog.open( ProfileCardComponent,  {
      data: { 
        validator
      }
    });
  }

  openValidatorDetailDialog(validator) {
    this.dialog.open( ValidatorComponent,  {
      data: { 
        validator
      },
      height: '75vh',
    });
  }

  openRewardsDialog(validator) {
    this.dialog.open( RewardsCardComponent,  {
      data: { 
        validator
      }
    });
  }

  openDelegatorDialog(validator) {
    this.dialog.open( DelegatorCardComponent,  {
      data: { 
        validator
      }
    });
  }

  openPowerEventsDialog(validator) {
    this.dialog.open( PowerEventCardComponent,  {
      data: { 
        validator
      }
    });
  }

  openProposedBlocksDialog(validator) {
    this.dialog.open( ProposedBlocksCardComponent,  {
      data: { 
        validator
      }
    });
  }

  openAddressDialog(validator) {
    this.dialog.open( AddressCardComponent,  {
      data: { 
        validator
      }
    });
  }
  /* END POPUPS */

  /* OLD CODE
  // displayUnbondColumn() {
  //   this.displayedColumns = [
  //     'rank',
  //     'moniker', 
  //     'status', 
  //     'weight', 
  //     'assets', 
  //     'delegators',
  //     'bond', 
  //     'unbond', 
  //     'commission'
  //   ];  
  // }

  // hideUnbondColumn() {
  //   this.displayedColumns = [
  //     'rank',
  //     'moniker', 
  //     'status', 
  //     'weight', 
  //     'assets', 
  //     'delegators',
  //     'bond', 
  //     'commission'
  //   ];  
  // }
  END OLD CODE */
}

