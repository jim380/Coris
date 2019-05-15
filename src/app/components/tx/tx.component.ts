import { Component, OnInit, Inject } from '@angular/core';
import { State } from 'src/app/interfaces/state.interface';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TxsListCardComponent } from '../txs/txs-list-card/txs-list-card.component';

// @aakatev
// 05/15/19
// commented out blocks
// is logic for openning
// component on separate route

// import { nodeRpc2 } from '../../../config.js'
// import { Tx, Tag, decodeTag } from '../../interfaces/tx.interface';

// import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tx',
  templateUrl: './tx.component.html',
  styleUrls: ['./tx.component.scss']
})
export class TxComponent implements OnInit {
  appState: Observable<State>;
  tx;

  constructor(
    private dialog: MatDialog,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store <State>,
    // private route: ActivatedRoute, 
    // private router: Router 
  ) {  
    // TODO remove debugging
    this.tx = data.tx;
  }

  ngOnInit() {
    console.log(this.tx);
    this.appState = this.store.select('App');
  }

  onCopySucceess() {
    // const options = { toastClass: 'opacity' };
    this.toastr.success('Copied to clipboard');
  }
  openTxsListDialog(address) {
    this.dialog.open( TxsListCardComponent,  {
      data: { 
        address
      }
    });
  }
  // queryTx () {
  //   this.initTxHash();
  //   this.http.get(`${nodeRpc2}/tx_search?query="tx.hash='${this.txHash}'"`).subscribe(async data => {

  //     if (data['error'] === undefined)  {
      
  //       const dataTx = await data['result'].txs[0];
  //       let dataTagsDecod : Tag[] = [];

  //       dataTx.tx_result.tags.forEach(tag => {
  //         dataTagsDecod.push(decodeTag(tag));
  //       });

  //       this.tx = {
  //         hash: dataTx.hash, 
  //         height: dataTx.height,
  //         gasUsed: dataTx.tx_result.gasUsed,
  //         gasWanted: dataTx.tx_result.gasWanted,
  //         txBase64: dataTx.tx,
  //         txDecod: atob(dataTx.tx),
  //         tagsBase64: dataTx.tx_result.tags,
  //         tagsDecod: dataTagsDecod
  //       };
  //       // TODO remove debugging
  //       // console.log(this.tx);
  //     }
  //   });
  // }


  // async clickButton(value) {
  //   // TODO remove debugging
  //   // console.log(value);
  //   // await this.router.navigate([`tx/${value}`]);
  //   this.queryTx();
  // }

  // initTxHash() {
  //   // this.txHash = this.route.snapshot.paramMap.get('hash');
  // }

}
