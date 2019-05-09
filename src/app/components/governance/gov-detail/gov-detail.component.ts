import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

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
  
  constructor(@Inject(MAT_DIALOG_DATA) public proposal: any) { }

  ngOnInit() {
    let proposalResult = this.proposal.final_tally_result;

    this.chartDatasets = [{ 
      data: [
        proposalResult.yes, 
        proposalResult.no, 
        proposalResult.no_with_veto, 
        proposalResult.abstrain
      ], 
      label: 'Votes' }
    ]
    console.log(this.proposal);
  }

}
