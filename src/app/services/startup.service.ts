import { Injectable, OnDestroy } from '@angular/core';
import { PricingService } from './pricing.service';
import { BlocksService } from './blocks.service';
import { ValidatorsService } from './validators.service';
import { WsService } from './ws.service';

@Injectable({
  providedIn: 'root'
})
export class StartupService implements OnDestroy{
  constructor(
    private pricingService: PricingService,
    private blocksService: BlocksService,
    private validatorsService: ValidatorsService,
    private wsService: WsService,
  ) { }

  public initApp() {
    this.validatorsService.initValidators();
    this.blocksService.fetch100Blocks();
    this.pricingService.setAtomPrice();
    this.pricingService.setStakingPool();
    this.pricingService.setInflation();
  }
  
  ngOnDestroy() {
    this.wsService.unsubscribe();
  }
}
