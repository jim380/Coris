import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-rewards-card',
  templateUrl: './rewards-card.component.html',
  styleUrls: ['./rewards-card.component.scss']
})
export class RewardsCardComponent implements OnInit {
  validator;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.validator = data.validator;
  }

  ngOnInit() {
  }

}
