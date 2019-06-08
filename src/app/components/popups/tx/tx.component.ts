import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { State, AppState } from 'src/app/state/app.interface';
import { selectAppState } from 'src/app/state/app.reducers';
import { AccountDetailComponent } from '../account-detail/account-detail.component';
import { ValidatorComponent } from '../validator/validator.component';
import { BlockComponent } from '../block/block.component';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-tx',
  templateUrl: './tx.component.html',
  styleUrls: [
    './tx.component.scss',
    '../popups-common.scss'
  ]
})
export class TxComponent implements OnInit {
  appState: Observable<State>;
  tx;
  objectKeys = Object.keys;

  constructor(
    public dialogRef: MatDialogRef<BlockComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private appStore: Store <AppState>,
    private popupService: PopupService
  ) {  
    // TODO remove debugging
    console.log(data.tx);
    this.tx = data.tx;
  }

  ngOnInit() {
    // console.log(this.tx);
    this.appState = this.appStore.select(selectAppState);
  }

  onCopySucceess() {
    // const options = { toastClass: 'opacity' };
    this.toastr.success('Copied to clipboard');
  }

  openAccountDialog(dlelegatorAddress) {
    this.popupService.openAccountDialogAddr(dlelegatorAddress, AccountDetailComponent);
  }

  openValidatorDetailDialog(operatorAddress) {
    this.popupService.openValidatorDialogAddr(operatorAddress, ValidatorComponent);
  }

  openBlockDialog(blockHeight) {
    this.popupService.openBlockDialogHeight(blockHeight, BlockComponent);
  }

}
