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
  blockTimes = [];
  avgBlockTime = 0;

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
        let startBlock = Number(data.blocks[0].header.height);
        this.bs.fetchRecentBlocks(startBlock);
        
        this.bs.avgBlockTime$.subscribe((data: any) => {
          this.avgBlockTime = data;
        })

        this.storeSubscription$.unsubscribe();
      }
    });
  }

  ngOnDestroy() {
    if(this.storeSubscription$) {
      this.storeSubscription$.unsubscribe();
    }
  }
  

  // getBlockTimesArray(blocks, array) {
  //   let blocksCounter$ = range( 0, (blocks.length-1) );
    
  //   blocksCounter$.subscribe((count: number) => {
  //     console.log(count);
  //     array[count] = ( 
  //       Date.parse(blocks[count].block.header.time) 
  //       - Date.parse(blocks[count+1].block.header.time) 
  //     );
  //   });
  // }

  // getArrayAverage(array: number[]) {
  //   let total = 0;
  //   array.forEach((element:number) => {
  //     total += element;
  //   });
  //   return total/array.length
  // }
}
