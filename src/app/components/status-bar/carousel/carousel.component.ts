import { Component, OnInit } from '@angular/core';
import { PricingService } from 'src/app/services/pricing.service';
import { BlocksService } from 'src/app/services/blocks.service';
import { ValidatorsService } from 'src/app/services/validators.service';
import { State } from 'src/app/interfaces/state.interface';
import { Store } from '@ngrx/store';
import { WsService } from 'src/app/services/ws.service';
import { Observable } from 'rxjs';
import { HostListener } from "@angular/core";
import { cards } from './carousel.content';
import { DatePipe } from '@angular/common';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { BreadcrumbModule } from 'ng-uikit-pro-standard';

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
  layout: number;
  datePipe = new DatePipe('en-US');

  constructor(
    private ws:WsService, 
    private store: Store <State>,
    private vs:ValidatorsService,
    private ps:PricingService,
    private bs:BlocksService
  ) { }

  ngOnInit() {
    this.appState = this.store.select('App');
    this.getScreenSize();

    this.setBlockTime();
    this.setInflation();
    this.setAtomPrice();
    this.appState
      .pipe(
        // debounceTime(3000),
        distinctUntilChanged()
      )
      .subscribe(data => {
        // TODO remove debugging
        // console.log(data);

        this.setConsensusState(data.roundStep);
        this.setLastBlock(data.blocks);
        this.setValidatorsCount(data.validators);
        this.setBondedTokens(data.stakePool);
        this.setCommunityPool(data.stakePool);
      });
  }

  ngOnDestroy() {
    this.ws.unsubscribe();
  }

  getCurrentTime() {
    return this.datePipe.transform( Date.now(), 'h:mm a');
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    let screenWidth = window.innerWidth;
    
    if(!this.layout) {
      this.layout = screenWidth > 730 ? 2 : 1; 
    }

    if(screenWidth < 730 && this.layout === 1) {
      this.slides = this.chunk(cards, 1);
      this.layout = 2;
    } else if(screenWidth > 730 && this.layout === 2) {
      this.slides = this.chunk(cards, 4);
      this.layout = 1;
    }
  }
  
  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    // console.log(R);
    return R;
  }
  

  setLastBlock(data) {
    // TODO @aakatev remove debugging
    // console.log(data);
    if(data.length > 0) {
      let block = data[0];
      let currentTime = this.getCurrentTime();

      if (this.layout === 1) {
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
    if(data) {
      let consensus = data;
      let currentTime = this.getCurrentTime();

      if (this.layout === 1) {
        if (consensus.step.includes("NewHeight")) {
          this.slides[0][1].data = `Block`;
        } else {
          this.slides[0][1].data = consensus.step.substring(9);
        }
        // this.slides[0][1].data = consensus.step.substring(9);
        this.slides[0][1].title = `round: ${consensus.round}`;
        this.slides[0][1].timestamp = currentTime;
      } else {
        if (consensus.step.includes("NewHeight")) {
          this.slides[1][0].data = `Block`;
        } else {
          this.slides[1][0].data = consensus.step.substring(9);
        }
        this.slides[1][0].data = consensus.step.substring(9);
        this.slides[1][0].title = `round: ${consensus.round}`;
        this.slides[1][0].timestamp = currentTime;
      }
    }
  }
  
  setValidatorsCount(data) {
    // TODO @aakatev remove debugging
    // console.log(data);
    let validators = data;
    let currentTime = this.getCurrentTime();

    if (this.layout === 1) {
      this.slides[0][2].data = validators.length;
      this.slides[0][2].timestamp = currentTime;
    } else {
      this.slides[2][0].data = validators.length;
      this.slides[2][0].timestamp = currentTime;
    }
    
  }
  setBondedTokens(data) {
    // TODO @aakatev remove debugging
    // console.log(data);
    
    if(data.bonded_tokens && data.not_bonded_tokens) {
      let currentTime = this.getCurrentTime();
      let bondedPercentage = ((data.bonded_tokens/1e6)/(data.bonded_tokens/1e6 + data.not_bonded_tokens/1e6)*100).toFixed(2)

      if (this.layout === 1) {
        this.slides[0][3].data = `${bondedPercentage}%`;
        this.slides[0][3].timestamp = currentTime;
      } else {
        this.slides[3][0].data = `${bondedPercentage}%`;
        this.slides[3][0].timestamp = currentTime;
      }
    }
  }

  setBlockTime() {
    this.bs.getBlockTime$()
      .subscribe(data => {
        // TODO remove debugging
        // console.log(data/1000);
        let blockTime = data/1000;
        let currentTime = this.getCurrentTime();
        if (this.layout === 1) {
          this.slides[0][4].data = blockTime.toFixed(2);
          this.slides[0][4].timestamp = currentTime;
        } else {
          this.slides[4][0].data = blockTime.toFixed(2);
          this.slides[4][0].timestamp = currentTime;
        }
      })
  }

  setCommunityPool(data) {
    // TODO @aakatev remove debugging
    // console.log(data);
    if(data.community_pool) {
      let communityPool = data.community_pool;
      let currentTime = this.getCurrentTime();

      if (this.layout === 1) {
        this.slides[0][5].data = (communityPool.amount/1e6).toFixed(0);
        this.slides[0][5].timestamp = currentTime;
      } else {
        this.slides[5][0].data = (communityPool.amount/1e6).toFixed(0);
        this.slides[5][0].timestamp = currentTime;
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
        if (this.layout === 1) {
          this.slides[1][0].data = `${(inflation*100).toFixed(2)}%`;
          this.slides[1][0].timestamp = currentTime;
        } else {
          this.slides[6][0].data = `${(inflation*100).toFixed(2)}%`;
          this.slides[6][0].timestamp = currentTime;
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
  
        if (this.layout === 1) {
          this.slides[1][1].data = price.toFixed(2);
          this.slides[1][1].timestamp = currentTime;
        } else {
          this.slides[7][0].data = price.toFixed(2);
          this.slides[7][0].timestamp = currentTime;
        }
      });
  }
}