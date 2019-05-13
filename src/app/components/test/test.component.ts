// Component to test services
// @aakatev 05/13/19 
// TODO delete component
import { Component, OnInit} from '@angular/core';
import { Observable, range, Subject } from 'rxjs';
import { State } from 'src/app/interfaces/state.interface';
import { Store } from '@ngrx/store';
import { distinctUntilChanged } from 'rxjs/operators';
import { BlocksService } from 'src/app/services/blocks.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})

export class TestComponent implements OnInit {
  appState: Observable<State>;
  storeSubscription$;
  
  recentBlocks = [];

  constructor( private bs: BlocksService ) { }


  ngOnInit() {
    this.bs.getRecentBlocks$()
      .subscribe((blocks) => {
        this.recentBlocks = blocks;
      });
  }

  ngOnDestroy() { }

  times = [];
  logBlocks() {
    console.log(this.recentBlocks);

    if(this.recentBlocks.length === 100) {
      this.bs.getBlockTimesArray(this.recentBlocks, this.times);
      console.log(
        this.bs.getArrayAverage(this.times)
      );
    }
  }
}
