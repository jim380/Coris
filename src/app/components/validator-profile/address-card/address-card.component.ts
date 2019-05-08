import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-address-card',
  templateUrl: './address-card.component.html',
  styleUrls: ['./address-card.component.scss']
})
export class AddressCardComponent implements OnInit {
  validator;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.validator = data.validator;
  }

  ngOnInit() {
  }

}
