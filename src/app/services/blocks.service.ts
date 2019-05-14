import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../interfaces/state.interface';
import { Observable, of, Subject, range, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { nodeRpc1, nodeRpc2 } from '../../config.js';

@Injectable({
  providedIn: 'root'
})
export class BlocksService {
  appState: Observable<State>;

  avgBlockTime = 0;
  avgBlockTime$ = new BehaviorSubject(this.avgBlockTime);

  recentBlocks = [];
  recentBlocks$ = new BehaviorSubject(this.recentBlocks);

  blocksTime = [];
  blocksTime$ = new BehaviorSubject(this.blocksTime);

  constructor(
    private store: Store<State>, 
    private http: HttpClient
  ) {
    this.appState = this.store.select('App');   
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

  getAvgBlockTime$() {
    return this.avgBlockTime$;
  }

  getBlocksTime$() {
    return this.getBlocksTime$;
  }

  getRecentBlocks$() {
    return this.getRecentBlocks$;
  }

  fetchRecentBlocks(lastBlock: number) {
    let blocksCounter$ = range(0, 100);
    let fetchedCounter = 0;

    blocksCounter$.subscribe(
      (count: number) => {
        this.fetchBlockAtAlternative(lastBlock - count)
          .subscribe( 
            (block: any) => {
              this.recentBlocks[count] = block;
              fetchedCounter += 1;
            }, 
            (error) => {  },
            () => {
              if(fetchedCounter === 100) {
                this.getBlockTimesArray(this.recentBlocks, this.blocksTime);
              }
            });
      });
  }

  private getBlockTimesArray(blocks, array) {
    let blocksCounter$ = range( 0, (blocks.length-1) );
    let arrayFilled = 0;
    
    blocksCounter$.subscribe(
      (count: number) => {
        array[count] = ( 
          Date.parse(blocks[count].block.header.time) 
          - Date.parse(blocks[count+1].block.header.time) 
        );
        arrayFilled++;
      },
      (error) => {  },
      () => {
        if (arrayFilled === 99) {
          this.recentBlocks$.next(blocks);
          this.blocksTime$.next(array);
          this.avgBlockTime = this.getArrayAverage(this.blocksTime);
          this.avgBlockTime$.next(this.avgBlockTime);
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
