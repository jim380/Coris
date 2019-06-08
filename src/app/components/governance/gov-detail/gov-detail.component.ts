import { Component, OnInit, Inject, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatTableDataSource, MatPaginator } from '@angular/material';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, State } from 'src/app/state/app.interface';
import { selectAppState } from 'src/app/state/app.reducers';
import { PopupService } from 'src/app/services/popup.service';
import { AccountDetailComponent } from '../../account-detail/account-detail.component';

@Component({
  selector: 'app-gov-detail',
  templateUrl: './gov-detail.component.html',
  styleUrls: ['./gov-detail.component.scss']
})
export class GovDetailComponent implements OnInit, AfterViewInit {
  public chartType: string = 'pie';
  public chartDatasets: Array<any> = [];
  public chartLabels: Array<any> = ['Yes', 'No', 'NoWithVeto', 'Abstain'];
  public chartColors: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5'],
      borderWidth: 2,
    }
  ];
  public chartOptions: any = {
    responsive: true
  };

  appState: Observable<AppState>;
  votesDataSource = new MatTableDataSource<any>([]);
  depositDataSource = new MatTableDataSource<any>([]);

  votesDisplayedColumns: string[] = ['voter', 'vote'];
  depositDisplayedColumns: string[] = ['depositor', 'amount'];

  @ViewChildren(MatPaginator) paginators = new QueryList<MatPaginator>();
  proposal;
  constructor(
    private popupService: PopupService,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private store: Store <State>
  ) { 
    this.proposal = data.proposal;
    this.initTable('All');
    this.initDepositTable();
  }

  ngOnInit() {
    this.appState = this.store.select(selectAppState);
    this.initChart();    
    // TODO remove debugging
    // console.log(this.proposal);
  }
  ngAfterViewInit() {
    this.votesDataSource.paginator = this.paginators.toArray()[0];
    this.depositDataSource.paginator = this.paginators.toArray()[1];
  }
  public initChart() {
    let tally = this.proposal.currentTally;

    this.chartDatasets = [{ 
      data: [
        tally.yes, 
        tally.no, 
        tally.no_with_veto, 
        tally.abstrain
      ], 
      label: 'Votes' }
    ]
  }
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  public initTable(filter) {
    this.votesDataSource = new MatTableDataSource<any>([...this.proposal.currentVotes]);
    this.votesDataSource.filterPredicate = (data: any, filter: string) => !filter || data.option == filter;
    if(filter !== 'All') {
      this.votesDataSource.filter = filter;
    }
    this.votesDataSource.paginator = this.paginators.toArray()[0];
  }

  public onTabChange(event) {
    // TODO remove debugging
    // console.log(event.tab.textLabel);
    this.initTable(event.tab.textLabel);
  }


  public initDepositTable() {
    // TODO remove debugging
    // console.log(this.proposal.currentDeposit);
    this.depositDataSource = new MatTableDataSource<any>([...this.proposal.currentDeposit]);
    this.depositDataSource.paginator = this.paginators.toArray()[1];
  }

  openAccountDialog(address) {
    this.popupService.openAccountDialogAddr(address, AccountDetailComponent);
  }
}
