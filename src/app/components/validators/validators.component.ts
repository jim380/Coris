import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatSort } from '@angular/material';
import {MatTable} from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { skipWhile, take } from 'rxjs/operators';
import { selectValidators } from 'src/app/state/validators/validators.reducers';
import { selectBlocksState } from 'src/app/state/blocks/blocks.reducers';
import { PopupService } from 'src/app/services/popup.service';
import { selectConsensusState } from 'src/app/state/consensus/consensus.reducers';
import { BlocksState } from 'src/app/state/blocks/blocks.interface';
import { ConsensusState } from 'src/app/state/consensus/consensus.interface';
import { State } from 'src/app/state';
import { selectStakeState } from 'src/app/state/stake/stake.reducers';
import { StakeState } from 'src/app/state/stake/stake.interface';

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

  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: false }) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  @ViewChild(MatSort, { static: false }) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }
  stakeState: Observable<StakeState>;
  blocksState: Observable<BlocksState>;
  consensusState: Observable<ConsensusState>

  valsUptime: Map<string,string> = new Map;
  totalTokens = 0;
  validators$;

  constructor(
    private appStore: Store<State>,
    private popupService: PopupService
  ) { 
    // console.log(this.appStore);
  }


  ngOnInit() {
    this.stakeState = this.appStore.select(selectStakeState);
    this.blocksState = this.appStore.select(selectBlocksState);
    this.consensusState = this.appStore.select(selectConsensusState);

    this.appStore.select(selectValidators)
    .pipe(
      skipWhile( validators => validators.length === 0),
      take(1)
    )
    .subscribe((data:any) => {
      this.dataSource = new MatTableDataSource<any>([...data]);
      this.setDataSourceAttributes();
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
      case 'balance': return ( item.account.value && item.account.value.coins ) ? Number( item.account.value.coins[0].amount ) : 0;
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
    { 
      bond: true,
      column: 'status'
    },
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
    this.popupService.openValidatorDialog(validator);
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

