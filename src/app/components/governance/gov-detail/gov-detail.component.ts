import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { State } from 'src/app/interfaces/state.interface';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-gov-detail',
  templateUrl: './gov-detail.component.html',
  styleUrls: ['./gov-detail.component.scss']
})
export class GovDetailComponent implements OnInit {

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
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  appState: Observable<State>;

  constructor(@Inject(MAT_DIALOG_DATA) public proposal: any, private store: Store <State>) { }

  ngOnInit() {
    this.appState = this.store.select('App');

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
    // console.log(this.proposal);
  }

}
