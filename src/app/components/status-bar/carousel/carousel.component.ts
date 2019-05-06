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

    this.appState
      .subscribe(data => {
        // TODO remove debugging
        console.log(data);
      }).unsubscribe();

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
          this.slides[1][1].timestamp = currentTime;
        }
      });
      
    this.ps.getInflation()
      .subscribe(data => {
        // TODO remove debugging
        // console.log(data);
        let inflation = Number(data);
        let currentTime = this.getCurrentTime();
        if (this.layout === 1) {
          this.slides[1][0].data = inflation.toFixed(3);
          this.slides[1][0].timestamp = currentTime;
        } else {
          this.slides[6][0].data = inflation.toFixed(3);
          this.slides[6][0].timestamp = currentTime;
        }
      });
    
    this.bs.getBlockTime$()
      .subscribe(data => {
        // TODO remove debugging
        // console.log(data/1000);
        let blockTime = data/1000;
        let currentTime = this.getCurrentTime();
        if (this.layout === 1) {
          this.slides[0][4].data = blockTime.toFixed(3);
          this.slides[0][4].timestamp = currentTime;
        } else {
          this.slides[4][0].data = blockTime.toFixed(3);
          this.slides[4][0].timestamp = currentTime;
        }
      })
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
      this.slides = this.chunk(cards, 6);
      this.layout = 1;
    }
  }
  
  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    console.log(R);
    return R;
  }
}