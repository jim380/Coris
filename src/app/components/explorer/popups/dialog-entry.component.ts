import { Component } from "@angular/core";
import { PopupService } from 'src/app/services/popup.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  template: ''
})
export class DialogEntryComponent {
  constructor(
    private popupService: PopupService,
    private activatedRoute: ActivatedRoute
  ) { 
    this.activatedRoute.url.subscribe((urlSegments) => {
      console.log("123", urlSegments)
      switch (urlSegments[0].path) {
        case "validator": {
          this.popupService.openValidatorDialogAddr(urlSegments[1].path);
          break;
        }
        case "block": {
          this.popupService.openBlockDialogHeight(urlSegments[1].path);
          break;
        }
        case "tx": {
          this.popupService.openTxDialogHash(urlSegments[1].path);
          break;
        }
        case "account": {
          this.popupService.openAccountDialogAddr(urlSegments[1].path);
          break;
        }
        case "proposal": {
          this.popupService.openGovDetailDialogId(urlSegments[1].path);
          break;
        }
        default: {
          // Router takes care of default
          break;
        }
      }
    });
  }
}