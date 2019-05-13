// Component to test services
// @aakatev 05/13/19 
// TODO delete component
import { Component, OnInit} from '@angular/core';
import { Observable, range } from 'rxjs';
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

  constructor(
    private store: Store <State>,
    private bs: BlocksService
  ) { }

  ngOnInit() {
    this.appState = this.store.select('App');

    this.storeSubscription$ = this.appState
    .pipe(
      distinctUntilChanged()
    )
    .subscribe(data => {
      if(data.blocks.length > 0 && this.storeSubscription$) {
        // TODO remove debugging
        console.log(data);

        let startBlock = Number(data.blocks[0].header.height);
        this.bs.fetchRecentBlocks(startBlock);

        this.bs.getRecentBlocks$().subscribe( (blocks$:any) => {
          // console.log(blocks$);
          this.recentBlocks = blocks$;
        });

        this.storeSubscription$.unsubscribe();
      }
    });
  }

  ngOnDestroy() {
    if(this.storeSubscription$) {
      this.storeSubscription$.unsubscribe();
    }
  }

  logBlocks() {
    console.log(this.recentBlocks);
    this.recentBlocks.forEach( (block: any) => {
      console.log(block.block.header.height);
    });
  }
}
