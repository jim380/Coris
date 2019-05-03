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
  appState: Observable<State>;
  validator;

  constructor (
    private store: Store<State>, 
    private route: ActivatedRoute,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
    this.validator = data.validator;
  }

  ngOnInit() { }
}
