import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-metrics-card',
  templateUrl: './metrics-card.component.html',
  styleUrls: ['./metrics-card.component.scss']
})
export class MetricsCardComponent implements OnInit {
  validator;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.validator = data.validator;
  }

  ngOnInit() {
  }

}
