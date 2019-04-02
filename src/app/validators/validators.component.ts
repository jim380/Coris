import { Component, OnInit } from '@angular/core';
// import { Validator } from './validator';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { WsService } from '../ws.service';

@Component({
  selector: 'app-validators',
  templateUrl: './validators.component.html',
  styleUrls: ['./validators.component.css']
})
export class ValidatorsComponent implements OnInit {
  appState: Observable<{blocks: [], txs:[], validators: []}>;
  fragment = null;
  valsUptime: Map<string,string> = new Map;

  constructor(private store: Store<{App: { blocks: [], txs: [], validators:[] } }>, private route: ActivatedRoute, private wsService: WsService) { }

  ngOnInit() {
    this.appState = this.store.select('App');

    this.route.fragment.subscribe(fragment => { this.fragment = fragment; });
    
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

  sortByPower () {
    this.wsService.sortValidators("tokens");
  }

  sortByPriority () {
    this.wsService.sortValidators("proposer_priority");
  }
  
  ngAfterViewInit(): void {
    try {
      if(this.fragment) {
        document.querySelector('#' + this.fragment).scrollIntoView();
      }
    } catch (e) { 
      // @aakatev hacky way of handling terminal errors dump
      // TODO look for a better solution later
    }
  }
}
