import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { PopupService } from 'src/app/services/popup.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state';
import { ToggleTheme } from 'src/app/state/app/app.actions';
import { selectActiveTheme } from 'src/app/state/app/app.reducers';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  activeRoute: string = "Pages";
  @ViewChild('sidenavRef', { static: false }) sidenav;
  theme$ = this.appStore.select(selectActiveTheme);
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    private changeDetectorRef: ChangeDetectorRef, 
    private media: MediaMatcher,
    private popupService: PopupService,
    private router: Router,
    private appStore: Store<State>
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy() {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


  ngOnInit() { }

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
