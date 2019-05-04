import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {
  validator;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.validator = data.validator;
  }

  ngOnInit() {
  }

}
