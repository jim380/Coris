import { Component, OnInit } from '@angular/core';
import { PricingService } from 'src/app/services/pricing.service';
import { BlocksService } from 'src/app/services/blocks.service';
import { ValidatorsService } from 'src/app/services/validators.service';
import { State } from 'src/app/interfaces/state.interface';
import { Store } from '@ngrx/store';
import { WsService } from 'src/app/services/ws.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  cards = [
    {
      data: 0,
      title: 'Last Block',
      description: 'Last Updated',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      data: 0,
      title: 'Consensus',
      description: 'Last Updated',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      data: 0,
      title: 'Validators',
      description: 'Last Updated',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      data: 0,
      title: 'Bonded',
      description: 'Last Updated',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      data: 0,
      title: 'Block Time',
      description: 'Last Updated',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      data: 0,
      title: 'Community Pool',
      description: 'Last Updated',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      data: 0,
      title: 'Inflation',
      description: 'Last Updated',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      data: 0,
      title: 'Price',
      description: 'Last Updated',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    }
  ];
  slides: any = [[]];
  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }

  appState: Observable<State>;
  
  constructor(
    private ws:WsService, 
    private store: Store <State>,
    private vs:ValidatorsService,
    private ps:PricingService,
    private bs:BlocksService
  ) { }

  ngOnInit() {
    this.slides = this.chunk(this.cards, 4);

    this.appState = this.store.select('App');
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
}