import { Component, OnInit } from '@angular/core';
// import { Validator } from './validator';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as AppActions from '../app.actions'

@Component({
  selector: 'app-validators',
  templateUrl: './validators.component.html',
  styleUrls: ['./validators.component.css']
})
export class ValidatorsComponent implements OnInit {
  appState: Observable<{blocks: [], txs:[], validators: []}>;
  
  constructor(private http: HttpClient, private store: Store<{App: { blocks: [], txs: [], validators:[] } }>) { }

  ngOnInit() {

    this.appState = this.store.select('App');

    this.http.get('https://aakatev.me/iris/status').subscribe(data => {
      // Debugging
      // let currValidators = data['result'].genesis.validators;
      let lastBlock = data['result'].sync_info.latest_block_height;

      this.http.get(`https://aakatev.me/iris/validators?height=${lastBlock}`).subscribe(data => {
        console.log(`Got validators at ${lastBlock}`);
        this.store.dispatch(new AppActions.UpdateValidators(data['result'].validators));
      });
    });
  }
}
