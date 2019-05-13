import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-chart-cards-gov',
  templateUrl: './chart-cards-gov.component.html',
  styleUrls: ['./chart-cards-gov.component.scss']
})
export class ChartCardsGovComponent implements OnInit, OnChanges {
  @Input() proposals: any; 
  graphRendered = 0;

  public govCharts = {
    type: 'pie',
    labels: ['Yes', 'No', 'Veto', 'Abstain'],
    datasets: [
      [],
      [],
      []
    ],
    colors: [
      {
        backgroundColor: ['#4285F4', '#ffbb33', '#29b6f6', '#FF5252'],
        hoverBackgroundColor: ['#6ea0f2', '#fec451', '#52c3f6', '#fa6e6e']
      }
    ],
    options: {
      responsive: true,
      legend: {
        labels: {
          fontColor: 'white',
        }
      }
    }
  }

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.proposals.currentValue[0].currentTally 
      && changes.proposals.currentValue[1].currentTally 
      && changes.proposals.currentValue[2].currentTally 
      && !this.graphRendered) {
      // TODO remove debugging
      // console.log(changes.proposals.currentValue);
      this.setChartData(changes.proposals.currentValue);
      this.graphRendered = 1;
    }
  }

  setChartData(data: any) {
    data.forEach( (proposal, index) => {
      // TODO remove debugging
      // console.log(proposal.currentTally);
      this.govCharts.datasets[index] = [
        proposal.currentTally.yes,
        proposal.currentTally.no,
        proposal.currentTally.no_with_veto,
        proposal.currentTally.abstain,
      ]
    });
  }

}
