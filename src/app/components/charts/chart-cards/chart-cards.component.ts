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
  public commissionChartType = 'bar';
  public commissionChartDatasets: Array<any> = [
    {
      data: [],
      label: 'Rate'
    },
    {
      data: [2, 7, 8],
      label: 'Max Rate'
    },
    {
      data: [11, 1, 10, 2],
      label: 'Rate Change'
    }
  ];
  public commissionChartLabels: Array<any> = [];
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
    // TODO remove debugging
    // console.log( this.comissions.rate.sort((a,b)=>a-b) );
    // console.log( this.comissions.max_change_rate.sort((a,b)=>a-b) );
    // console.log( this.comissions.max_rate.sort((a,b)=>a-b) );

    let rateMap = this.getArrayDistribution(this.comissions.rate.sort((a,b)=>a-b));
    let changeRateMap = this.getArrayDistribution(this.comissions.max_change_rate.sort((a,b)=>a-b));
    let maxRateMap = this.getArrayDistribution(this.comissions.max_rate.sort((a,b)=>a-b));

    let commissionChartLabels = this.getLabelsArray([rateMap, changeRateMap, maxRateMap]);

    // TODO remove debugging
    // console.log(commissionChartLabels);

    this.fillMaps([rateMap, changeRateMap, maxRateMap], commissionChartLabels);

    let rateArray = this.convertToArray(rateMap, commissionChartLabels);
    let maxRateArray = this.convertToArray(maxRateMap, commissionChartLabels);
    let changeRateArray =  this.convertToArray(changeRateMap, commissionChartLabels);

    this.initCommissionGraph(commissionChartLabels, rateArray, maxRateArray, changeRateArray);
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
        if ( labelArray.indexOf(key) === -1 ) { 
          labelArray.push(key); 
        }
      });
    });
    return labelArray.sort((a,b)=>a-b);
  }

  fillMaps(mapArray: any, array: any) {
    mapArray.forEach( (map: any) => {
      array.forEach(element => {
        if( (!map.has(element)) ) {
          map.set(element, 0);
        }
      });
    });
  }

  convertToArray(map: any, array: any) {
    let convertedArray = [];
    array.forEach((element, index) => {
      convertedArray[index] = map.get(element);
    });

    return convertedArray;
  }

  initCommissionGraph(labels, rate, maxRate, rateChange) {
    this.commissionChartLabels = labels.map((x) => {
      return x.toFixed(3);
    });
    this.commissionChartDatasets[0].data = rate;
    this.commissionChartDatasets[1].data = maxRate;
    this.commissionChartDatasets[2].data = rateChange;
  }
}
