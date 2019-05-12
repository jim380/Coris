import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { State } from 'src/app/interfaces/state.interface';
import { Store } from '@ngrx/store';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-chart-cards',
  templateUrl: './chart-cards.component.html',
  styleUrls: ['./chart-cards.component.scss']
})
export class ChartCardsComponent implements OnInit {
  // public map: any = { lat: 51.678418, lng: 7.809007 };
  
  public commissionChartType = 'bar';
  public commissionChartDatasets: Array<any> = [
    {
      data: [65, 59, 80, 90, 5],
      labels: [0, 50, 60, 80, 100],
      label: 'Rate'
    },
    {
      data: [12, 50, 20, 10, 12],
      labels: [0, 30, 60, 80, 100],
      label: 'Max Rate'
    },
    {
      data: [12, 50, 20, 10, 12],
      labels: [0, 40, 60, 80, 100],
      label: 'Max Change'
    }
  ];
  public commissionChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderColor: 'rgba(255,255,255,1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(255,255,255,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,255,255,1)'
    },
    {
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderColor: 'rgba(255,255,255,1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(255,255,255,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,255,255,1)'
    },
    {
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderColor: 'rgba(255,255,255,1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(255,255,255,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,255,255,1)'
    }
  ];
  public commissionChartOptions: any = {
    responsive: true,
    legend: {
      labels: {
        fontColor: 'white',
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: 'white',
        }
      }],
      xAxes: [{
        ticks: {
          fontColor: 'white',
        }
      }]
    }
  };
  public commissionChartLabels: Array<any> = [0, .25, .50, .75, 1];
  
  public blockChartType = 'line';
  public blockChartDatasets: Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: '#1'},
    {data: [28, 48, 10, 69, 36, 37, 110], label: '#2'},
    {data: [38, 58, 30, 79, 26, 37, 20], label: '#3'},
    {data: [48, 68, 20, 89, 76, 27, 40], label: '#4'}
  ];
  public blockChartLabels: Array<any> = [0, 40, 60, 80, 100];
  public blockChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(220,220,220,0.2)',
      borderColor: 'rgba(220,220,220,1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(220,220,220,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(220,220,220,1)'
    }
  ];

  public radarChartType = 'radar';
  public radarChartDatasets: Array<any> = [65, 59, 40, 87];
  public radarChartColors: Array<any> = [
    {
      backgroundColor: ['#4285F4', '#ffbb33', '#29b6f6', '#FF5252'],
      hoverBackgroundColor: ['#6ea0f2', '#fec451', '#52c3f6', '#fa6e6e']
    }
  ];
  public radarChartOptions: any = {
    responsive: true,
    legend: {
      labels: {
        fontColor: 'white',
      }
    }
  };
  public radarChartLabels: Array<any> = [0, 40, 60, 80, 100];


  appState: Observable<State>;
  storeSubscription$;
  comissions = {
    max_change_rate: [],
    max_rate: [],
    rate: []
  };

  comissionsDistribution = {
    max_change_rate: [],
    max_rate: [],
    rate: []

  }

  constructor(private store: Store <State>) {
    this.appState = this.store.select('App');
  }

  ngOnInit() {
    this.storeSubscription$ = this.appState
      .pipe(
        // debounceTime(3000),
        distinctUntilChanged()
      )
      .subscribe(data => {
        if(data.validators.serviceLoaded && this.storeSubscription$) {
          // TODO remove debugging
          // console.log(data);
          this.initCommissionChart(data.validators);

          this.storeSubscription$.unsubscribe();
        }
      });
  }

  ngOnDestroy() {
    if(this.storeSubscription$) {
      this.storeSubscription$.unsubscribe();
    }
  }

  initCommissionChart(data) {
    data.forEach( (validator: any) => {
      // TODO remove debugging
      // console.log(validator.commission);

      this.comissions.max_change_rate.push( Number(validator.commission.max_change_rate) );
      this.comissions.max_rate.push( Number(validator.commission.max_rate) );
      this.comissions.rate.push( Number(validator.commission.rate) );
    });
    console.log( this.comissions.rate.sort((a,b)=>a-b) );
    console.log( this.comissions.max_change_rate.sort((a,b)=>a-b) );
    console.log( this.comissions.max_rate.sort((a,b)=>a-b) );

    let rateMap = this.getArrayDistribution(this.comissions.rate.sort((a,b)=>a-b));
    let changeRateMap = this.getArrayDistribution(this.comissions.max_change_rate.sort((a,b)=>a-b));
    let maxRate = this.getArrayDistribution(this.comissions.max_rate.sort((a,b)=>a-b));

    this.commissionChartLabels = this.getLabelsArray([rateMap, changeRateMap, maxRate]);
    
    // this.setBlockChartData(rateMap);
    // this.setBlockChartData(changeRateMap);
    // this.setBlockChartData(maxRate);

  }

  getArrayDistribution(array: any) {
    let distributionMap = new Map();

    array.forEach(element => {
      if( distributionMap.has(element) ) {
        distributionMap.set(
          element,
          distributionMap.get(element) + 1
        );
      } else {
        distributionMap.set(element, 1);
      }
    });
    return distributionMap;
  }

  getLabelsArray(array: any) {
    let labelArray = [];

    array.forEach( (map: any) => {
      map.forEach((value, key) => {
        if (labelArray.indexOf(key) === -1) { 
          labelArray.push(key); 
        }
      });
    });

    return labelArray.sort((a,b)=>a-b);
  }
  setBlockChartData(distributionMap) {
    distributionMap.forEach((value, key) => {
      // this.commissionChartLabels.push(key);
      console.log('key: ', key, 'value: ', value, '\n');
    });
  }
}
