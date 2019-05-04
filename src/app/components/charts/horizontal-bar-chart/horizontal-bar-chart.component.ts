import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { State } from 'src/app/interfaces/state.interface';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-horizontal-bar-chart',
  templateUrl: './horizontal-bar-chart.component.html',
  styleUrls: ['./horizontal-bar-chart.component.scss']
})
export class HorizontalBarChartComponent implements OnInit {

  public chartType: string = 'horizontalBar';

  public chartDatasets: Array<any> = [
    { data: [], label: 'Voting Weight' }
  ];

  public chartLabels: Array<any> = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];

  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
  
  appState: Observable<State>;
  validators$;

  constructor(private store: Store <State>,) { }

  ngOnInit() {
    this.appState = this.store.select('App');

    this.validators$ = this.appState
      .pipe(
        map(data => data.validators)
      )
      .subscribe(data => {
        // @aakatev remove debugging
        // console.log(data);
        if(this.validators$ && data.length > 0) {
          let tempArray = [];
          // @aakatev remove debugging
          // console.log(data);
          data.forEach(validator => {
            tempArray.push(validator.tokens)
          });
          this.chartLabels = [
            { data: [], label: 'Voting Weight' }
          ];
          this.validators$.unsubscribe();
        }
      });
  }

}
