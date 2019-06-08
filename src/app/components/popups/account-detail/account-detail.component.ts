import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { PricingService } from 'src/app/services/pricing.service';
import { TxsService } from 'src/app/services/txs.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: [
    './account-detail.component.scss',
    '../popups-common.scss'
  ]
})
export class AccountDetailComponent implements OnInit {
  delegator = {
    address: "",
    balance: {
      total: 0,
      available: 0,
      delegated: 0,
      unbonding: 0,
      rewards: 0
    },
    delegations: null,
    redelegations: null,
    rewards: null,
    unbondingDelegations: null
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
      console.log("Account", data);
      if(data.value.coins) {
        this.delegator.balance.available = Number(data.value.coins[0].amount);
        this.delegator.balance.total += Number(data.value.coins[0].amount);
        // console.log(this.delegator.balance.total);
      }
    });

    this.ts.getDelegations(this.delegator.address).subscribe((data: any) => {
      // TODO remove debugging
      console.log("Delegations:", data);

      if(data) {
        this.delegator.delegations = data;

        data.forEach((delegation: any) => {
          console.log(Number(delegation.shares));
          this.delegator.balance.delegated += Number(delegation.shares);
          this.delegator.balance.total += Number(delegation.shares);
          
          // console.log(this.delegator.balance.total);
        });
      }
    });

    this.ts.getUnbondingDelegations(this.delegator.address).subscribe((data: any) => {
      // TODO remove debugging
      console.log("Unbonding delegations:", data);
      if(data) {
        this.delegator.unbondingDelegations = data;

        data.forEach((delegation: any) => {
          delegation.entries.forEach((entry: any) => {
            this.delegator.balance.unbonding += Number(entry.balance);
            this.delegator.balance.total += Number(entry.balance);    
          });
        });

      }
    });

    this.ts.getRedelegations(this.delegator.address).subscribe((data: any) => {
      // TODO remove debugging
      console.log("Redelegations:", data);
      if(data) {
        this.delegator.redelegations = data;
      }
    });

    this.ts.getDelegatorRewards(this.delegator.address).subscribe((data: any) => {
      // TODO remove debugging
      console.log("Rewards:", data);
      if(data) {
        this.delegator.rewards = data;
        data.forEach((reward: any) => {
          this.delegator.balance.rewards += Number(reward.amount);
          this.delegator.balance.total += Number(reward.amount);

          console.log(this.delegator.balance.total);
        });
      }
    });

    this.ps.getAtomPrice()
      .subscribe((data: any) => {
        // TODO remove debugging
        // console.log(data.data['3794']);
        this.quoteUsd = data.data['3794'].quote.USD.price;
    });


    // this.ts.getDelegatorValidators(this.delegator.address).subscribe((data: any) => {
    //   // TODO remove debugging
    //   console.log("Validators:", data);
    // });

  }

}
