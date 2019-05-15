import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material';

import { State } from 'src/app/interfaces/state.interface';

@Component({
  selector: 'app-validator',
  templateUrl: './validator.component.html',
  styleUrls: ['./validator.component.scss']
})

export class ValidatorComponent implements OnInit {
  validator;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    // private route: ActivatedRoute
  ) { 
    // let address = this.route.snapshot.paramMap.get('address');
    // console.log(address);
    
    this.validator = data.validator;
    console.log(data);
  }

  ngOnInit() { } 
}
