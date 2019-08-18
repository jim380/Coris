import { Component, OnInit, ViewChild } from '@angular/core';
import { PopupService } from 'src/app/services/popup.service';
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
  @ViewChild('sidenavRef', { static: true }) sidenav;
  theme$ = this.appStore.select(selectActiveTheme);
  
  constructor(
    private popupService: PopupService,
    private router: Router,
    private appStore: Store<State>
  ) { }

  ngOnInit() {
  }


  onToggleTheme() {
    this.appStore.dispatch(new ToggleTheme());
  }
}
