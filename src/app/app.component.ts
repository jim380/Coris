import { Component } from '@angular/core';
import { WsService } from './ws.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  navLinksAttr = ["","open"]
  linksAttrs = ["", "fade"];

  appState: Observable<{blocks:[], txs:[], validators:[], round:{}, roundStep: {}, valsMap: Map<string,string>}>;

  constructor(
    private ws:WsService, 
    private store: Store <{App: {
      blocks:[], 
      txs:[], 
      validators:[], 
      round:{}, 
      roundStep: {},
      valsMap: Map<string,string>,
    }
  }>) {  }

  ngOnInit() { 
    this.appState = this.store.select('App');
  }

  ngOnDestroy() {
    this.ws.unsubscribe();
  }

  onHamburgerClick() {
    this.navLinksAttr.reverse();
    this.linksAttrs.reverse();
  }
}

