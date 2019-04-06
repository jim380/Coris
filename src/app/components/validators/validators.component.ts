import { Component, OnInit } from '@angular/core';
// import { Validator } from './validator';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { ValidatorsService } from '../../services/validators.service';
import { Sort } from '@angular/material';

@Component({
  selector: 'app-validators',
  templateUrl: './validators.component.html',
  styleUrls: ['./validators.component.css']
})
export class ValidatorsComponent implements OnInit {
  appState: Observable<{blocks: [], txs:[], validators: []}>;
  // fragment = null;
  valsUptime: Map<string,string> = new Map;
  totalTokens = 0;

  dataSource=[];
  displayedColumns: string[] = [
    'moniker', 
    'status', 
    'weight', 
    'assets', 
    'delegators',
    'bond', 
    'unbond', 
    'blockTime',
    'commission'
  ];

  constructor(
    private store: Store<{App: { blocks: [], txs: [], validators:[] } }>, 
    private route: ActivatedRoute, 
    private validatorsService: ValidatorsService) { 

    }

  ngOnInit() {
    this.appState = this.store.select('App');
    // this.route.fragment.subscribe(fragment => { this.fragment = fragment; });
    this.appState.subscribe(data => {
      this.dataSource = [...data.validators];
    });
    // this.appState.subscribe(data => {
    //   data.validators.forEach(validator => {
    //     if(validator['slashing']) {
    //       console.log(
    //         validator['slashing']['missed_blocks_counter']/
    //         (data.blocks.slice(0,1)[0]['header']['height'] - 
    //         validator['slashing']['start_height'])
    //       );
    //     }
    //   })
    // })
    
  }

  // ngAfterViewInit(): void {
  //   try {
  //     document.querySelector('#' + this.fragment).scrollIntoView();
  //   } catch (e) { }
  // }
  
  sortData(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      return;
    }

    const isAsc = sort.direction === 'asc';
    switch (sort.active) {
      case 'weight': return this.validatorsService.sortValidatorsNumber('tokens', isAsc);;
      case 'name': return this.validatorsService.sortValidatorsString('moniker',isAsc);
      default: return 0;
    }
  }

  sortBy(parameter, isAsc) {
    this.validatorsService.sortValidatorsNumber(parameter, isAsc);
  }

  // sortByPriority () {
  //   this.validatorsService.sortValidators("proposer_priority");
  // }
  
  // ngAfterViewInit(): void {
  //   try {
  //     if(this.fragment) {
  //       document.querySelector('#' + this.fragment).scrollIntoView();
  //     }
  //   } catch (e) { 
  //     // @aakatev hacky way of handling terminal errors dump
  //     // TODO look for a better solution later
  //   }
  // }
}
