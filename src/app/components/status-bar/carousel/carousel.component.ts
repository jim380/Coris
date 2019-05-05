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

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  slides: any = [[]];
  appState: Observable<State>;
  // 0 - for bigger screens
  // 1 - for smaller screens
  layout: number;
  
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
    console.log(this.slides);

    // this.ps.getAtomPrice().subscribe(data => {
    //   // TODO remove debugging
    //   // console.log(data.data['3794']);
    //   this.cards[7].data = data.data['3794'].quote.USD.price;
    //   this.slides = this.chunk(this.cards, 6);  
    // });
    
    // this.ps.getInflation().subscribe(data => {
    //   // TODO remove debugging
    //   // console.log(data);
    //   this.inflation = data;
    // });
    
    // this.bs.getBlockTime$()
    //   .subscribe(data => {
    //     this.avgBlockTime = data/1000;
    //   })
  }

  ngOnDestroy() {
    this.ws.unsubscribe();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    let screenWidth = window.innerWidth;
    
    if(!this.layout) {
      this.layout = screenWidth > 730 ? 1 : 0; 
    }

    if(screenWidth < 730 && this.layout === 0) {
      this.slides = this.chunk(cards, 1);
      this.layout = 1;
    } else if(screenWidth > 730 && this.layout === 1) {
      this.slides = this.chunk(cards, 6);
      this.layout = 0;
    }
  }
  
  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }
}