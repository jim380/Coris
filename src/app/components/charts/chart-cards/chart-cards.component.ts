import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { State } from 'src/app/interfaces/state.interface';
import { Store } from '@ngrx/store';
import { distinctUntilChanged } from 'rxjs/operators';
import { 
  commissionChart,
  radarChart,
  blockChart } from './chart-cards.config';

@Component({
  selector: 'app-chart-cards',
  templateUrl: './chart-cards.component.html',
  styleUrls: ['./chart-cards.component.scss']
})
export class ChartCardsComponent implements OnInit {
  public commissionChartType = commissionChart.type;
  public commissionChartDatasets = commissionChart.datasets;
  public commissionChartLabels = commissionChart.labels;
  public commissionChartColors = commissionChart.colors;
  public commissionChartOptions = commissionChart.options;
  
  public blockChartType = blockChart.type;
  public blockChartDatasets = blockChart.datasets;
  public blockChartLabels = blockChart.labels;
  public blockChartColors = blockChart.colors;

  public radarChartType = radarChart.type;
  public radarChartDatasets = radarChart.datasets;
  public radarChartColors = radarChart.colors;
  public radarChartOptions = radarChart.options;
  public radarChartLabels = radarChart.labels;


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
