import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectValidatorsMap } from 'src/app/state/validators/validators.reducers';
import { State } from 'src/app/state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-validator-span',
  templateUrl: './validator-span.component.html',
  styleUrls: ['./validator-span.component.scss']
})
export class ValidatorSpanComponent implements OnInit {
  @Input() 
  validator: string;
  validatorsMap$: Observable<any> = this.appStore.select(selectValidatorsMap); 

  constructor(
    private appStore: Store<State>,
  ) { }

  ngOnInit() { }
}
