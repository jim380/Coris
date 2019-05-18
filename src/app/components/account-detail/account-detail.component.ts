import { Component, OnInit, Inject } from '@angular/core';
import { TxsService } from 'src/app/services/txs.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { PricingService } from 'src/app/services/pricing.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit {
  delegator = {
    address: "",
    coins: 0,
    total: 0
  };
  quoteUsd: 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private ts: TxsService, 
    private ps: PricingService
  ) { 
    this.delegator.address = data.address;
  }

  ngOnInit() {
    this.ts.getAccountInfo(this.delegator.address).subscribe((data: any) => {
      // TODO remove debugging
      // console.log(data);
      this.delegator.coins = data.value.coins ? data.value.coins[0].amount/1e6 : 0;
      this.delegator.total = this.delegator.coins;
    });

    this.ps.getAtomPrice()
      .subscribe(data => {
        // TODO remove debugging
        // console.log(data.data['3794']);
        this.quoteUsd = data.data['3794'].quote.USD.price;
    });
  }
}
