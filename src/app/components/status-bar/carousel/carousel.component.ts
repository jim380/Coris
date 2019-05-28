import { Component, OnInit } from '@angular/core';
import { PricingService } from 'src/app/services/pricing.service';
import { BlocksService } from 'src/app/services/blocks.service';
// import { ValidatorsService } from 'src/app/services/validators.service';
import { WsService } from 'src/app/services/ws.service';
import { Observable } from 'rxjs';
import { HostListener } from "@angular/core";
import { cards } from './carousel.content';
import { DatePipe } from '@angular/common';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { BreadcrumbModule } from 'ng-uikit-pro-standard';
import { State } from 'src/app/state/app.interface';
import { selectAppState } from 'src/app/state/app.reducers';
import { Store } from '@ngrx/store';
import { selectValidatorsState } from 'src/app/state/validators/validators.reducers';
import { selectBlocksState } from 'src/app/state/blocks/blocks.reducers';

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
    private ws:WsService, 
    private appStore: Store <State>,
    // private vs:ValidatorsService,
    private ps:PricingService,
    private bs:BlocksService
  ) { }

  ngOnInit() {
    this.getScreenSize();

    this.setInflation();
    this.setAtomPrice();

    this.appStore.select(selectAppState)
      .pipe(
        distinctUntilChanged()
      )
      .subscribe(appState => {
        // if (data.roundStep && !this.blocksFetched) {
        //   this.bs.fetchRecentBlocks( 
        //     Number( (data.roundStep.height-1) ) 
        //   );
        //   this.blocksFetched = true;
        // }

        this.setConsensusState(appState.roundStep);
        this.setBondedTokens(appState.stakePool);
        this.setCommunityPool(appState.stakePool);
      });
    
      this.appStore.select(selectValidatorsState)
      .subscribe(validatorsState => {
        this.setValidatorsCount(validatorsState.validators);
      });

      this.appStore.select(selectBlocksState)
      .subscribe(validatorsState => {
        this.setLastBlock(validatorsState.blocks);
      })

      this.bs.fetch100Blocks();

      this.setBlockTime();
  }

  ngOnDestroy() {
    this.ws.unsubscribe();
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
  
  getScreenLayout(width) {
    if(width > BREAKPOINTS.XL) {
      return 'XL';
    } else if(width > BREAKPOINTS.MD){
      return 'MD';
    } else {
      return 'SM';
    }
  }

  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    // TODO remove debugging
    // console.log(R);
    return R;
  }
  

  setLastBlock(data) {
    // TODO @aakatev remove debugging
    // console.log(data);
    if(data.length > 0) {
      let block = data[0];
      let currentTime = this.getCurrentTime();

      if (this.screenLayot === 'XL') {
        this.slides[0][0].data = block.header.height;
        this.slides[0][0].timestamp = currentTime;
      } else if (this.screenLayot === 'SM') {
        this.slides[0][0].data = block.header.height;
        this.slides[0][0].timestamp = currentTime;
      } else {
        this.slides[0][0].data = block.header.height;
        this.slides[0][0].timestamp = currentTime; 
      }
    }
  }

  setConsensusState(data) {
    // TODO @aakatev remove debugging
    // console.log(data);
    // TOFIX this place has async bug that is hard to replicate
    // look into it more
    if(data.step) {
      let consensus = data;
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
  }
  
  setValidatorsCount(data) {
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
  setBondedTokens(data) {
    // TODO @aakatev remove debugging
    // console.log(data);
    if(data.bonded_tokens && data.not_bonded_tokens) {
      let currentTime = this.getCurrentTime();
      let bondedPercentage = ((data.bonded_tokens/1e6)/(data.bonded_tokens/1e6 + data.not_bonded_tokens/1e6)*100).toFixed(2)

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
  }

  setBlockTime() {
    this.bs.getAvgBlockTime$()
      .subscribe(data => {
        // TODO remove debugging
        // console.log(data);
        let blockTime = data/1000;
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
      })
  }

  setCommunityPool(data) {
    // TODO @aakatev remove debugging
    // console.log(data);
    if(data.community_pool) {
      let communityPool = data.community_pool;
      let currentTime = this.getCurrentTime();

      if (this.screenLayot === 'XL') {
        this.slides[1][1].data = (communityPool.amount/1e6).toFixed(0);
        this.slides[1][1].timestamp = currentTime;
      } else if (this.screenLayot === 'SM') {
        this.slides[5][0].data = (communityPool.amount/1e6).toFixed(0);
        this.slides[5][0].timestamp = currentTime;
      } else {
        this.slides[2][1].data = (communityPool.amount/1e6).toFixed(0);
        this.slides[2][1].timestamp = currentTime;
      }
    }
  }

  setInflation() {
    this.ps.getInflation()
      .subscribe(data => {
        // TODO remove debugging
        // console.log(data);
        let inflation = Number(data);
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
      });
  }

  setAtomPrice() {
    this.ps.getAtomPrice()
      .subscribe(data => {
        // TODO remove debugging
        // console.log(data.data['3794']);
        let price = data.data['3794'].quote.USD.price;
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
      });
  }

  getCurrentTime() {
    return this.datePipe.transform( Date.now(), 'h:mm a');
  }

}