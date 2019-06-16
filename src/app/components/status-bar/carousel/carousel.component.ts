import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HostListener } from "@angular/core";
import { cards } from './carousel.content';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectValidatorsState } from 'src/app/state/validators/validators.reducers';
import { selectConsensusState, selectConsensusHeight } from 'src/app/state/consensus/consensus.reducers';
import { State } from 'src/app/state';
import { selectBlocksTimeAvg } from 'src/app/state/blocks/blocks.reducers';
import { selectStakePool, selectAtomPrice, selectInflation } from 'src/app/state/stake/stake.reducers';

export const BREAKPOINTS = {
  MD: 768,
  XL: 1200,  
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})

export class CarouselComponent implements OnInit {
  slides: any = [[]];
  appState: Observable<State>;
  // 1 - for bigger screens
  // 2 - for smaller screens
  // 3 - for medium screens
  screenLayot: string;
  datePipe = new DatePipe('en-US');
  blocksFetched = false;

  constructor(
    private appStore: Store <State>,
  ) { }

  ngOnInit() {
    this.getScreenSize();

    this.appStore.select(selectConsensusState)
    .subscribe(state => {
      this.setConsensusState(state);
    });

    this.appStore.select(selectConsensusHeight)
    .subscribe(height => {
      this.setLastBlock(height-1);
    });

    this.appStore.select(selectValidatorsState)
    .subscribe(state => {
      this.setValidatorsCount(state.validators);
    });

    this.appStore.select(selectAtomPrice)
    .subscribe(price => {
      this.setAtomPrice(price);
    });

    this.appStore.select(selectInflation)
    .subscribe(inflation => {
      this.setInflation(inflation);
    });

    this.appStore.select(selectStakePool)
    .subscribe(stakePool => {
      this.setBondedTokens(stakePool);
      this.setCommunityPool(stakePool);
    });

    this.appStore.select(selectBlocksTimeAvg)
      .subscribe(avg => {
        this.setBlockTime(avg);
      });
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    // TODO remove debugging
    // console.log(window.innerWidth);
    let screenWidth = window.innerWidth;
    
    if(!this.screenLayot || this.screenLayot != this.getScreenLayout(screenWidth)) {
      this.screenLayot = this.getScreenLayout(screenWidth);

      switch (this.screenLayot) {
        case 'XL': {
          this.slides = this.chunk(cards, 4);
          // TODO remove debugging
          // console.log('XL');
          break;
        }
        case 'MD': {
          this.slides = this.chunk(cards, 2);
          // TODO remove debugging
          // console.log('MD');
          break;
        }   
        case 'SM': {
          this.slides = this.chunk(cards, 1);
          // TODO remove debugging
          // console.log('SM');
          break;
        }
      }
    }
  }
  
  private getScreenLayout(width) {
    if(width > BREAKPOINTS.XL) {
      return 'XL';
    } else if(width > BREAKPOINTS.MD){
      return 'MD';
    } else {
      return 'SM';
    }
  }

  private chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    // TODO remove debugging
    // console.log(R);
    return R;
  }
  

  public setLastBlock(height) {
    // TODO @aakatev remove debugging
    // console.log(height);
    let currentTime = this.getCurrentTime();

    if (this.screenLayot === 'XL') {
      this.slides[0][0].data = height;
      this.slides[0][0].timestamp = currentTime;
    } else if (this.screenLayot === 'SM') {
      this.slides[0][0].data = height;
      this.slides[0][0].timestamp = currentTime;
    } else {
      this.slides[0][0].data = height;
      this.slides[0][0].timestamp = currentTime; 
    }
  }

  public setConsensusState(consensus) {
    // TODO @aakatev remove debugging
    // console.log(consensus);
    let currentTime = this.getCurrentTime();
    let formattedStep;
    if (consensus.step.includes("NewHeight")) {
      formattedStep = `Block`;
    } else {
      formattedStep = consensus.step.substring(9);
    }

    if (this.screenLayot === 'XL') {
      this.slides[0][1].data = formattedStep;
      this.slides[0][1].title = `round: ${consensus.round}`;
      this.slides[0][1].timestamp = currentTime;
    } else if (this.screenLayot === 'SM') {
      this.slides[1][0].data = formattedStep;
      this.slides[1][0].data = consensus.step.substring(9);
      this.slides[1][0].title = `round: ${consensus.round}`;
      this.slides[1][0].timestamp = currentTime;
    } else {
      this.slides[0][1].data = formattedStep;
      this.slides[0][1].data = consensus.step.substring(9);
      this.slides[0][1].title = `round: ${consensus.round}`;
      this.slides[0][1].timestamp = currentTime;
    }
  }
  
  public setValidatorsCount(data) {
    // TODO @aakatev remove debugging
    // console.log(data);
    let validators = data;
    let currentTime = this.getCurrentTime();

    if (this.screenLayot === 'XL') {
      this.slides[0][2].data = validators.length;
      this.slides[0][2].timestamp = currentTime;
    } else if (this.screenLayot === 'SM') {
      this.slides[2][0].data = validators.length;
      this.slides[2][0].timestamp = currentTime;
    } else {
      this.slides[1][0].data = validators.length;
      this.slides[1][0].timestamp = currentTime;
    }
    
  }
  public setBondedTokens(pool) {
    // TODO @aakatev remove debugging
    // console.log(pool);
    let currentTime = this.getCurrentTime();
    let bondedPercentage = ((pool.bonded/1e6)/(pool.bonded/1e6 + pool.notBonded/1e6)*100).toFixed(2)

    if (this.screenLayot === 'XL') {
      this.slides[0][3].data = `${bondedPercentage}%`;
      this.slides[0][3].timestamp = currentTime;
    } else if (this.screenLayot === 'SM') {
      this.slides[3][0].data = `${bondedPercentage}%`;
      this.slides[3][0].timestamp = currentTime;
    } else {
      this.slides[1][1].data = `${bondedPercentage}%`;
      this.slides[1][1].timestamp = currentTime;
    }
  }

  public setBlockTime(time) {
    // TODO @aakatev remove debugging
    // console.log(time);
    let blockTime = time/1000;
    let currentTime = this.getCurrentTime();
    if (this.screenLayot === 'XL') {
      this.slides[1][0].data = blockTime.toFixed(2);
      this.slides[1][0].timestamp = currentTime;
    } else if (this.screenLayot === 'SM') {
      this.slides[4][0].data = blockTime.toFixed(2);
      this.slides[4][0].timestamp = currentTime;
    } else {
      this.slides[2][0].data = blockTime.toFixed(2);
      this.slides[2][0].timestamp = currentTime;
    }
  }

  public setCommunityPool(pool) {
    // TODO @aakatev remove debugging
    // console.log(data);
    let currentTime = this.getCurrentTime();

    if (this.screenLayot === 'XL') {
      this.slides[1][1].data = (pool.communityPool/1e6).toFixed(0);
      this.slides[1][1].timestamp = currentTime;
    } else if (this.screenLayot === 'SM') {
      this.slides[5][0].data = (pool.communityPool/1e6).toFixed(0);
      this.slides[5][0].timestamp = currentTime;
    } else {
      this.slides[2][1].data = (pool.communityPool/1e6).toFixed(0);
      this.slides[2][1].timestamp = currentTime;
    }
  }

  public setInflation(inflation) {
    let currentTime = this.getCurrentTime();
    if (this.screenLayot === 'XL') {
      this.slides[1][2].data = `${(inflation*100).toFixed(2)}%`;
      this.slides[1][2].timestamp = currentTime;
    } else if (this.screenLayot === 'SM') {
      this.slides[6][0].data = `${(inflation*100).toFixed(2)}%`;
      this.slides[6][0].timestamp = currentTime;
    } else {
      this.slides[3][0].data = `${(inflation*100).toFixed(2)}%`;
      this.slides[3][0].timestamp = currentTime;
    }
  }

  public setAtomPrice(price) {
    let currentTime = this.getCurrentTime();

    if (this.screenLayot === 'XL') {
      this.slides[1][3].data = price.toFixed(2);
      this.slides[1][3].timestamp = currentTime;
    } else if (this.screenLayot === 'SM') {
      this.slides[7][0].data = price.toFixed(2);
      this.slides[7][0].timestamp = currentTime;
    } else {
      this.slides[3][1].data = price.toFixed(2);
      this.slides[3][1].timestamp = currentTime;
    }
  }

  private getCurrentTime() {
    return this.datePipe.transform( Date.now(), 'h:mm a');
  }

}