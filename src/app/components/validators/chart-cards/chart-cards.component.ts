import { Component, OnInit } from '@angular/core';
import { Observable, range } from 'rxjs';
import { first, skipWhile } from 'rxjs/operators';
import { 
  commissionChart,
  scatterChart,
  blockChart } from './chart-cards.config';
import { selectValidators } from 'src/app/state/validators/validators.reducers';
import { Store } from '@ngrx/store';
import { Validator } from 'src/app/state/validators/validator.interface';
import { State } from 'src/app/state';
import { selectBlocksTime, selectBlocksTimeAvg } from 'src/app/state/blocks/blocks.reducers';

@Component({
  selector: 'app-chart-cards',
  templateUrl: './chart-cards.component.html',
  styleUrls: ['./chart-cards.component.scss']
})
export class ChartCardsComponent implements OnInit {
  // scatter
  public scatterChartOptions = scatterChart.options;
  public scatterChartData = scatterChart.datasets;
  public scatterChartType = scatterChart.type;
  public scatterChartLabels = scatterChart.labels;
  public scatterChartColors = scatterChart.colors;

  public commissionChartType = commissionChart.type;
  public commissionChartDatasets = commissionChart.datasets;
  public commissionChartLabels = commissionChart.labels;
  public commissionChartColors = commissionChart.colors;
  public commissionChartOptions = commissionChart.options;
  
  public blockChartType = blockChart.type;
  public blockChartDatasets = blockChart.datasets;
  public blockChartLabels = blockChart.labels;
  public blockChartColors = blockChart.colors;
  public blockChartOptions = blockChart.options;

  validators$: Observable<Validator[]>;
  validatorsSubscription$;

  blocksTime$: Observable<any[]>;
  blocksTimeSubscription$;

  blocksTimeAvg$: Observable<number>;
  blocksTimeAvgSubscription$;

  constructor(
    private appStore: Store <State>
  ) {
    this.validators$ = this.appStore.select(selectValidators);
    this.blocksTime$ = this.appStore.select(selectBlocksTime);
    this.blocksTimeAvg$ = this.appStore.select(selectBlocksTimeAvg);
  }

  ngOnInit() {
    this.validatorsSubscription$ = this.validators$
    .pipe(
      skipWhile(validators => validators.length === 0),
      first()
    )
    .subscribe(validators => {
        // TODO remove debugging
        // console.log(data);
        this.initCommissionChart(validators);
        this.initScatterChart(validators);
    });

    this.blocksTime$
    .pipe(
      skipWhile(time => time.length === 0),
      first()
    )
    .subscribe((time: any[]) => {
      let formattedBlocksTime = time.map(x => x/1000);
      if(formattedBlocksTime.length === 99) {
        // TODO remove debugging
        // console.log( formattedBlocksTime );
        this.blockChartDatasets = [ { data: formattedBlocksTime, label: 'Block Time'}, this.blockChartDatasets[1] ];
      }
    });

    this.blocksTimeAvg$
    .pipe(
      skipWhile(avg => avg === 0),
      first()
    )
    .subscribe(avg => {
      // TODO remove debugging
      // console.log(data);
      let avgBlockTime = [];
      for (let i = 0; i < 100; i++) {
        avgBlockTime[i] = avg/1000;
      }
      this.blockChartDatasets = [ this.blockChartDatasets[0], { data: avgBlockTime, label: 'Avg. Block Time'} ];
    })
  }

  ngOnDestroy() {
    if(this.validatorsSubscription$) {
      this.validatorsSubscription$.unsubscribe();
    }
    if(this.blocksTimeSubscription$) {
      this.blocksTimeSubscription$.unsubscribe();
    }
    if(this.blocksTimeAvgSubscription$) {
      this.validatorsSubscription$.unsubscribe();
    }
  }

  initScatterChart(validatorsArray: any[]) {
    // TODO remove debugging
    // console.log(validatorsArray);
    const validatorsCounter$ = range(0, 100);
  validatorsCounter$
    .subscribe( (count) => { 
      // console.log(validatorsArray[count]);
      this.scatterChartData[0].data.push({ x: count+1, y: validatorsArray[count].tokens, r: 3});
      this.scatterChartData[1].data.push({ x: count+1, y: validatorsArray[count].self_bond_total, r: 3 });
      this.scatterChartData[2].data.push({ x: count+1, y: Number(validatorsArray[count].account.value.coins[0].amount), r: 3});
      
      if( validatorsArray[count].outstanding_rewards ) {
        this.scatterChartData[3].data.push({ x: count+1, y: Number(validatorsArray[count].rewards[0].amount), r: 3 });
      } else {
        this.scatterChartData[3].data.push({ x: count+1, y: 0, r: 3 });
      }
    });


  }

  initCommissionChart(data) {
    let comissions = {
      max_change_rate: [],
      max_rate: [],
      rate: []
    };
  
    data.forEach( (validator: any) => {
      // TODO remove debugging
      // console.log(validator.commission);
      comissions.max_change_rate.push( Number(validator.commission.max_change_rate) );
      comissions.max_rate.push( Number(validator.commission.max_rate) );
      comissions.rate.push( Number(validator.commission.rate) );
    });
    let rateMap = this.getArrayDistribution(comissions.rate);
    let changeRateMap = this.getArrayDistribution(comissions.max_change_rate);
    let maxRateMap = this.getArrayDistribution(comissions.max_rate);

    let commissionChartLabels = this.getLabelsArray([rateMap, changeRateMap, maxRateMap]);

    // TODO remove debugging
    // console.log(commissionChartLabels);

    this.fillMaps([rateMap, changeRateMap, maxRateMap], commissionChartLabels);

    let rateArray = this.convertMapToArray(rateMap, commissionChartLabels);
    let maxRateArray = this.convertMapToArray(maxRateMap, commissionChartLabels);
    let changeRateArray =  this.convertMapToArray(changeRateMap, commissionChartLabels);

    this.renderCommissionGraph(commissionChartLabels, rateArray, maxRateArray, changeRateArray);
  }

  private getArrayDistribution(array: any) {
    array.sort((a,b) => a-b);
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

  private getLabelsArray(array: any) {
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

  private fillMaps(mapArray: any, array: any) {
    mapArray.forEach( (map: any) => {
      array.forEach(element => {
        if( (!map.has(element)) ) {
          map.set(element, 0);
        }
      });
    });
  }

  private convertMapToArray(map: any, array: any) {
    let convertedArray = [];
    array.forEach((element, index) => {
      convertedArray[index] = map.get(element);
    });

    return convertedArray;
  }

  private renderCommissionGraph(labels, rate, maxRate, rateChange) {
    this.commissionChartLabels = labels.map((x) => {
      return x.toFixed(3);
    });
    this.commissionChartDatasets[0].data = rate;
    this.commissionChartDatasets[1].data = maxRate;
    this.commissionChartDatasets[2].data = rateChange;
  }

}
