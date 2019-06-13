import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { BlockComponent } from '../block/block.component';
import { PopupService } from 'src/app/services/popup.service';
import { State } from 'src/app/state';
import { ValidatorsState } from 'src/app/state/validators/validator.interface';
import { selectValidatorsState } from 'src/app/state/validators/validators.reducers';

@Component({
  selector: 'app-tx',
  templateUrl: './tx.component.html',
  styleUrls: [
    './tx.component.scss',
    '../popups-common.scss'
  ]
})
export class TxComponent implements OnInit {
  validatorsState: Observable<ValidatorsState>;
  tx;
  objectKeys = Object.keys;

  constructor(
    public dialogRef: MatDialogRef<BlockComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private appStore: Store <State>,
    @Inject(forwardRef(() => PopupService)) public popupService: PopupService,
  ) {  
    // TODO remove debugging
    console.log(data.tx);
    this.tx = data.tx;
  }

  ngOnInit() {
    // console.log(this.tx);
    this.validatorsState = this.appStore.select(selectValidatorsState);
  }

  onCopySucceess() {
    // const options = { toastClass: 'opacity' };
    this.toastr.success('Copied to clipboard');
  }

  openAccountDialog(dlelegatorAddress) {
    this.dialogRef.close();
    this.popupService.openAccountDialogAddr(dlelegatorAddress);
  }

  openValidatorDetailDialog(operatorAddress) {
    this.dialogRef.close();
    this.popupService.openValidatorDialogAddr(operatorAddress);
  }

  openBlockDialog(blockHeight) {
    this.dialogRef.close();
    this.popupService.openBlockDialogHeight(blockHeight);
  }

}
