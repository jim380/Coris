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
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

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
  slides: any = cards;
  appState: Observable<State>;
  // 1 - for bigger screens
  // 2 - for smaller screens
  // 3 - for medium screens
  screenLayot: string;
  datePipe = new DatePipe('en-US');
  blocksFetched = false;
  
  public config: SwiperConfigInterface = {
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: true,
    pagination: false,
    spaceBetween: 10
  };

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
          // TODO remove debugging
          // console.log('XL');
          this.config.slidesPerView = 4;
          break;
        }
        case 'MD': {
          // TODO remove debugging
          // console.log('MD');
          this.config.slidesPerView = 2;
          break;
        }   
        case 'SM': {    
          // TODO remove debugging
          // console.log('SM');
          this.config.slidesPerView = 1;
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

  public setLastBlock(height) {
    // TODO @aakatev remove debugging
    // console.log(height);
    let currentTime = this.getCurrentTime();
    this.slides[0].data = height;
    this.slides[0].timestamp = currentTime;

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

    this.slides[1].data = formattedStep;
    this.slides[1].data = consensus.step.substring(9);
    this.slides[1].title = `round: ${consensus.round}`;
    this.slides[1].timestamp = currentTime;
  }
  
  public setValidatorsCount(data) {
    // TODO @aakatev remove debugging
    // console.log(data);
    let validators = data;
    let currentTime = this.getCurrentTime();

    this.slides[2].data = validators.length;
    this.slides[2].timestamp = currentTime;
  }
  public setBondedTokens(pool) {
    // TODO @aakatev remove debugging
    // console.log(pool);
    let currentTime = this.getCurrentTime();
    let bondedPercentage = ((pool.bonded/1e6)/(pool.bonded/1e6 + pool.notBonded/1e6)*100).toFixed(2)

    this.slides[3].data = `${bondedPercentage}%`;
    this.slides[3].timestamp = currentTime;

  }

  public setBlockTime(time) {
    // TODO @aakatev remove debugging
    // console.log(time);
    let blockTime = time/1000;
    let currentTime = this.getCurrentTime();
    this.slides[4].data = blockTime.toFixed(2);
    this.slides[4].timestamp = currentTime;

  }

  public setCommunityPool(pool) {
    // TODO @aakatev remove debugging
    // console.log(data);
    let currentTime = this.getCurrentTime();

    this.slides[5].data = (pool.communityPool/1e6).toFixed(0);
    this.slides[5].timestamp = currentTime;
  }

  public setInflation(inflation) {
    let currentTime = this.getCurrentTime();

    this.slides[6].data = `${(inflation*100).toFixed(2)}%`;
    this.slides[6].timestamp = currentTime;
  }

  public setAtomPrice(price) {
    let currentTime = this.getCurrentTime();

    this.slides[7].data = price.toFixed(2);
    this.slides[7].timestamp = currentTime;

  }

  private getCurrentTime() {
    return this.datePipe.transform( Date.now(), 'h:mm a');
  }

}