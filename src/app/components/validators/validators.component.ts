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

export class SeletedOption {
  public Id: number;
  public Value: string;
}

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
  // Mat-table
  private dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  private displayedColumns: string[] = [
    'rank',
    'moniker', 
    // 'status', 
    'weight', 
    'assets', 
    'delegators',
    'bond', 
    'commission'
  ];

  private paginator: MatPaginator;
  private sort: MatSort;

  public statusChartOptions: any = {
    responsive: true
  };
  
  private selectedOption: SeletedOption[];
  private optionsSelect: Array<any>;


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
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'rank': return item.rank;
        case 'moniker': return item.description.moniker;
        case 'tokens': return Number(item.tokens);
        case 'balance': return item.distribution.balance.amount;
        case 'delegations': return item.delegations.length;
        case 'self_bond': return item.self_bond;
        case 'commission': return item.commission.rate;
        default: return item[property];
      }
    }
    this.dataSource.filterPredicate = function(data, filter): boolean {
      return data.status === Number(filter) || data.jailed === filter;
    };
  }
  
  constructor(
    private store: Store<State>, 
    private dialog: MatDialog,
    private validatorsHelperService: ValidatorsHelperService
  ) { 
    // this.hideUnbondColumn();
  }


  ngOnInit() {
    this.selectedOption = [
      {Id: 1, Value: 'Bonded'},
      {Id: 2, Value: 'Jailed'},
      {Id: 3, Value: 'Unbonded'},
      {Id: 4, Value: 'Unbonding'},
      {Id: 5, Value: 'All'}
    ];

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
      // this.dataSource.paginator = this.paginator;
      console.log(data);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
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


  // validatorsFilter(bondStatus, isJailed) {
  //   // this.hideUnbondColumn();

  //   this.appState.subscribe(data => {
  //     // @aakatev remove debugging
  //     // console.log(data.validators);
  //     let filterSource = [];

  //     data.validators.forEach(validator => {
  //       if(validator.status === bondStatus && validator.jailed === isJailed) {
  //         filterSource.push(validator);
  //       }
  //     });
  //     this.dataSource = new MatTableDataSource<any>([...filterSource]);
  //   }).unsubscribe();
  // }

  validatorsJailedFilter(isJailed) {
    this.dataSource.filter = isJailed;
  }

  validatorsBondFilter(bondStatus) {
    
  }

  validatorsNoFilter() {
  }
}
