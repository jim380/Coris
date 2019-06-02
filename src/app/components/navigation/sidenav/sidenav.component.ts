import { Component, OnInit, ViewChild } from '@angular/core';
import { PopupService } from 'src/app/services/popup.service';
import { AccountDetailComponent } from '../../account-detail/account-detail.component';
import { MatDialog } from '@angular/material';
import { ValidatorComponent } from '../../validator/validator.component';
import { TxComponent } from '../../tx/tx.component';
import { BlockComponent } from '../../block/block.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  activeRoute: string = "Pages";
  @ViewChild('sidenavRef') sidenav;

  constructor(
    private popupService: PopupService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSearchBtnClick(query) {
    if(query.length === 45 && query.slice(0, 6) === "cosmos") {
      this.popupService.openAccountDialogAddr(query, this.dialog, AccountDetailComponent);
    } else if(query.length === 52 && query.slice(0, 13) === "cosmosvaloper") {
      this.popupService.openValidatorDialogAddr(query, this.dialog, ValidatorComponent);
    } else if(query.length === 64) {
      this.popupService.openTxDialog(query, this.dialog, TxComponent);
    } else if(!isNaN(query)) {
      this.popupService.openBlockDialog(query, this.dialog, BlockComponent);
    } else {
      this.popupService.openValidatorDialogMoniker(query, this.dialog, ValidatorComponent);
    }
  }


  onMobileSearchBtnClick(query) {
    this.sidenav.hide();
    this.onSearchBtnClick(query);
  }


  onRouterEvent(e) {
    // console.log(this.router.url);
    switch (this.router.url) {
      case "/validators":
          this.activeRoute = "Validator";
        break;
      
      case "/blocks":
          this.activeRoute = "Blocks";
        break;
  
      case "/txs":
          this.activeRoute = "Transactions";
        break;
    
      case "/gov":
          this.activeRoute = "Governance";
        break;
      
      default:
        this.activeRoute = "Pages";
        break;
    }
  }

  
}
