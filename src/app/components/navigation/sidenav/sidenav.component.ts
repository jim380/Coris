import { Component, OnInit, ViewChild } from '@angular/core';
import { PopupService } from 'src/app/services/popup.service';
import { AccountDetailComponent } from '../../popups/account-detail/account-detail.component';
import { ValidatorComponent } from '../../popups/validator/validator.component';
import { TxComponent } from '../../popups/tx/tx.component';
import { BlockComponent } from '../../popups/block/block.component';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state';
import { ToggleTheme } from 'src/app/state/app/app.actions';
import { selectActiveTheme } from 'src/app/state/app/app.reducers';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  activeRoute: string = "Pages";
  @ViewChild('sidenavRef') sidenav;
  theme$ = this.appStore.select(selectActiveTheme);
  
  constructor(
    private popupService: PopupService,
    private router: Router,
    private appStore: Store<State>
  ) { }

  ngOnInit() {
  }

  onSearchBtnClick(query) {
    if(query.length === 45 && query.slice(0, 6) === "cosmos") {
      this.popupService.openAccountDialogAddr(query);
    } else if(query.length === 52 && query.slice(0, 13) === "cosmosvaloper") {
      this.popupService.openValidatorDialogAddr(query);
    } else if(query.length === 64) {
      this.popupService.openTxDialogHash(query);
    } else if(!isNaN(query)) {
      this.popupService.openBlockDialogHeight(query);
    } else {
      this.popupService.openValidatorDialogMoniker(query);
    }
  }

  onToggleTheme() {
    this.appStore.dispatch(new ToggleTheme());
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
