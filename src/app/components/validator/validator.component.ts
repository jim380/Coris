import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material';

import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-validator',
  templateUrl: './validator.component.html',
  styleUrls: ['./validator.component.css']
})

export class ValidatorComponent implements OnInit {
  appState: Observable<{blocks: [], txs:[], validators: []}>;
  validatorData;

  public doughnutChartLabels: Label[] = ['Validator Weight', 'Total Weight'];
  public doughnutChartData: MultiDataSet;
  public doughnutChartType: ChartType = 'doughnut';

  constructor(
    private store: Store<{App: { blocks: [], txs: [], validators:[] } }>, 
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
