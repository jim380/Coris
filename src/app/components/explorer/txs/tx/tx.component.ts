// import { Component, OnInit, Inject } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
// import { Store } from '@ngrx/store';
// import { Observable } from 'rxjs';
// import { ToastrService } from 'ngx-toastr';
// import { BlockComponent } from '../../blocks/block/block.component';
// import { State } from 'src/app/state';
// import { ValidatorsState } from 'src/app/state/validators/validator.interface';
// import { selectValidatorsState } from 'src/app/state/validators/validators.reducers';

// @Component({
//   selector: 'app-tx',
//   templateUrl: './tx.component.html',
//   styleUrls: [
//     './tx.component.scss',
//   ]
// })
// export class TxComponent implements OnInit {
//   validatorsState: Observable<ValidatorsState>;
//   tx;
//   objectKeys = Object.keys;

//   constructor(
//     public dialogRef: MatDialogRef<BlockComponent>,
//     private toastr: ToastrService,
//     @Inject(MAT_DIALOG_DATA) public data: any,
//     private appStore: Store <State>,
//   ) {  
//     // TODO remove debugging
//     console.log(data.tx);
//     this.tx = data.tx;
//   }

//   ngOnInit() {
//     // console.log(this.tx);
//     this.validatorsState = this.appStore.select(selectValidatorsState);
//   }

//   onCopySucceess() {
//     // const options = { toastClass: 'opacity' };
//     this.toastr.success('Copied to clipboard');
//   }

//   openAccountDialog(dlelegatorAddress) {
//     this.dialogRef.close();
//     this.data.service.openAccountDialogAddr(dlelegatorAddress);
//   }

//   openValidatorDetailDialog(operatorAddress) {
//     this.dialogRef.close();
//     this.data.service.openValidatorDialogAddr(operatorAddress);
//   }

//   openBlockDialog(blockHeight) {
//     this.dialogRef.close();
//     this.data.service.openBlockDialogHeight(blockHeight);
//   }

// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlocksService } from 'src/app/services/blocks.service';


@Component({
  selector: 'app-tx',
  templateUrl: './tx.component.html',
  styleUrls: [
    './tx.component.scss',
  ]
})
export class TxComponent implements OnInit {
  private hash: String | null = null;
  private selectedTx: any | null = null;


  constructor(
    private route: ActivatedRoute,
    private blocksService: BlocksService
  ) {}

  ngOnInit(): void {
    this.selectBlock();
    console.log(this.hash);
  }

  selectBlock(): void {
    this.hash = this.route.snapshot.paramMap.get('hash');
    // this.blocksService.fetchBlockAtAlternative(this.height)
    // .subscribe((block: any) => {
    //   this.selectedTx = block;
    // });
  }

}
