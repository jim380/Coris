import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, Subject, range, BehaviorSubject, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, takeLast, take, mergeMap, concatMap, skipWhile } from 'rxjs/operators';
import { nodeRpc1, nodeRpc2 } from '../../config';
import { selectBlocks, selectBlocksState } from '../state/blocks/blocks.reducers';
import { selectAppState } from '../state/app/app.reducers';
import { selectConsensusHeight } from '../state/consensus/consensus.reducers';
import { State } from '../state/index.js';
import { UpdateBlocksTime, UpdateBlocksTimeAvg } from '../state/blocks/blocks.actions.js';

@Injectable({
  providedIn: 'root'
})
export class BlocksService {
  constructor(
    private appStore: Store<State>,
    private http: HttpClient
  ) { }

  fetch100Blocks(){ 
    this.appStore.select(selectConsensusHeight)
    .pipe(
      skipWhile(height => height === '0'), 
      take(1), 
      map(height => height-1)
    )
    .subscribe( height => {
      forkJoin(
        this.fetch20Blocks(height),
        this.fetch20Blocks(height-20),
        this.fetch20Blocks(height-40),
        this.fetch20Blocks(height-60),
        this.fetch20Blocks(height-80)
      )
      .subscribe(([res1, res2, res3, res4, res5]) => {
        this.getBlockTimesArray(
          [
            ...res1,
            ...res2,
            ...res3,
            ...res4,
            ...res5
          ], 
          []
        );
      });
    });
  }

  fetch20Blocks(height) {
    return this.http.get(`${nodeRpc2}/blockchain?minHeight=${height-20}&maxHeight=${height}`)
      .pipe(
        map((res:any) => res.result.block_metas)
      );
  }
  
  // fetchBlocks() doesnt include precommits
  fetchBlocks(maxHeight) {
    return this.http.get(`${nodeRpc2}/blockchain?maxHeight=${maxHeight}`);
  }

  fetchCommitAt(height) {
    return this.http.get(`${nodeRpc2}/commit?height=${height}`);
  }

  // fetchBlockAt(), 
  // fetchBlockAtAlternative(), 
  // getLastBlock() include precommits
  
  // fetchBlockAt() - Tendermint version
  // returns unminified json 
  fetchBlockAt(height) {
    return this.http.get(`${nodeRpc2}/block?height=${height}`);
  }

  // fetchBlockAtAlternative() - Gaia version
  // returns minified json
  fetchBlockAtAlternative(height) {
    return this.http.get(`${nodeRpc1}/blocks/${height}`);
  }

  getLastBlock() {
    return this.http.get(`${nodeRpc1}/blocks/latest`);
  }

  private getBlockTimesArray(blocks, array) {
    let blocksCounter$ = range( 0, (blocks.length-1) );
    let arrayFilled = 0;
    
    blocksCounter$.subscribe(
      (count: number) => {
        array[count] = ( 
          Date.parse(blocks[count].header.time) 
          - Date.parse(blocks[count+1].header.time) 
        );
        arrayFilled++;
      },
      (error) => { 
        console.log(error);
      },
      () => {
        if (arrayFilled === 99) {
          let avgBlockTime = this.getArrayAverage(array);
          this.appStore.dispatch(new UpdateBlocksTime(array));
          this.appStore.dispatch(new UpdateBlocksTimeAvg(avgBlockTime));
        }
      }
    );
  }

  getArrayAverage(array: number[]) {
    let total = 0;
    array.forEach((element:number) => {
      total += element;
    });
    return total/array.length
  }
}
