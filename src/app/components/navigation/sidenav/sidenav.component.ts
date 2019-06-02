import { Component, OnInit } from '@angular/core';
import { PopupService } from 'src/app/services/popup.service';
import { AccountDetailComponent } from '../../account-detail/account-detail.component';
import { MatDialog } from '@angular/material';
import { ValidatorComponent } from '../../validator/validator.component';
import { TxComponent } from '../../tx/tx.component';
import { BlockComponent } from '../../block/block.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(
    private popupService: PopupService,
    private dialog: MatDialog
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

    }
  }

  
}
