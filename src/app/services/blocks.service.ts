import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../interfaces/state.interface';
import { Observable, of, Subject, range } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { nodeRpc1, nodeRpc2 } from '../../config.js';

@Injectable({
  providedIn: 'root'
})
export class BlocksService {
  appState: Observable<State>;
  avgBlockTime = 0;
  avgBlockTime$ = new Subject<any>();
  recentBlocks = [];

  constructor(
    private store: Store<State>, 
    private http: HttpClient) {
      this.appState = this.store.select('App');
      this.getBlockTime();      
  }
  getBlockTime() {
    let subscription$ = this.appState
    .pipe(
      map(data => data.blocks)
    )
    .subscribe( data => {
      if(data.length > 0) {
        // TODO remove debugging
        // console.log(data[0].header.height);
        this.fetchBlocks(data[0].header.height)
          .subscribe(data => {
            let blocks = data['result'].block_metas;
            // TODO remove debugging
            // console.log(blocks);

            for(let i = 0; (i < blocks.length-1); i++) {
              if(this.avgBlockTime == 0) {
                this.avgBlockTime = ( Date.parse(blocks[i].header.time) - Date.parse(blocks[i+1].header.time) );
              } else {
                this.avgBlockTime
                  = ( this.avgBlockTime
                  + ( Date.parse(blocks[i].header.time) - Date.parse(blocks[i+1].header.time) ))
                  / 2;
              }
              this.avgBlockTime$.next(this.avgBlockTime);
              // TODO remove debugging
              // console.log(this.avgBlockTime);  
            }
          });
          
        subscription$.unsubscribe();
      }
    });  
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

  getBlockTime$(): Observable<any> {
    return this.avgBlockTime$.asObservable();
  }

  fetchRecentBlocks(lastBlock: number) {
    let blocksCounter$ = range(0, 100);
    
    blocksCounter$.subscribe((count: number) => {
      this.fetchBlockAtAlternative(lastBlock - count)
        .subscribe( (block: any) => {
          this.recentBlocks[count] = block;
        });
    });
  }

  getRecentBlocks$(): Observable<any[]> {
    return of(this.recentBlocks);
  }
}
