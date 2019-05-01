import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material';

import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { State } from 'src/app/interfaces/state.interface';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent implements OnInit {
  appState: Observable<State>;
  validatorData;

  public doughnutChartLabels: Label[] = ['Validator Weight', 'Total Weight'];
  public doughnutChartData: MultiDataSet;
  public doughnutChartType: ChartType = 'doughnut';

  constructor(
    private store: Store<State>, 
    private route: ActivatedRoute,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data);
      this.doughnutChartData = [
        [Number(data.validator.tokens), data.totalTokens],
      ]
  }

  ngOnInit() {
  
  }
}
