import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { State, AppState } from '../../state/app.interface';
import { Store } from '@ngrx/store';
import { nodeRpc1, nodeRpc2 } from '../../../config.js'
import { Tx, Tag, decodeTag } from '../../interfaces/tx.interface';
import { MatTableDataSource, MatPaginator, MatTable, MatSort, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TxsListCardComponent } from './txs-list-card/txs-list-card.component';
import { TxComponent } from '../tx/tx.component';
import { ValidatorComponent } from '../validator/validator.component';
import { take } from 'rxjs/operators';
import { PopupService } from 'src/app/services/popup.service.js';
import { AccountDetailComponent } from '../account-detail/account-detail.component';
import { selectAppState } from 'src/app/state/app.reducers';


@Component({
  selector: 'app-txs',
  templateUrl: './txs.component.html',
  styleUrls: ['./txs.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TxsComponent implements OnInit {
  public INITIAL_TXS_COUNT = 15;

  private dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  // private paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;
  // @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
  //   this.paginator = mp;
  //   this.setDataSourceAttributes();
  // }

  setDataSourceAttributes() {
    /*  05/15/19 @aakatev
      Commented out blocks are part of 
      server side pagination logic, which
      needs better refinement (possibly separate API)
      Could be reused after alpha  
    */

    // let lastPage = Math.ceil(this.totalTxsCount/30);
    
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.paginator.nextPage = () => { this.displayOlderTxs(); }
    // this.dataSource.paginator.previousPage = () => { this.displayNewerTxs(); }
    // this.dataSource.paginator.hasNextPage = () => { return true; }
    // this.dataSource.paginator.hasPreviousPage = () => { return true; }
    // this.dataSource.paginator._intl.getRangeLabel = 
      // (page: number, pageSize: number, length: number) => { 
      //   return `${this.currentPage} of ${this.lastPage}`;  
      // }

    // if (this.currentPage === 1) {
    //   this.dataSource.paginator.hasPreviousPage = () => { return false; }
    // } else if(this.currentPage === lastPage ) {
    //   this.dataSource.paginator.hasNextPage = () => { return false; }
    // }
    console.log(this.dataSource.data);
  }

  txs: Tx[];
  displayedColumns: string[] = [
    'hash',
    'status',
    'type',
    'fee',
    'height',
    'timestamp'
  ];
  expandedElement: Tx | null;

  minHeight = 0;
  lastBlock = 0;
  // @aakatev TODO lookup how to query more than 30 txs at json
  blocksToScan = 30;
  totalTxsCount = 0;
  // currentPage = 1;
  // lastPage = 1;
  appState: Observable<AppState>;

  constructor(
    private toastr: ToastrService,
    private appStore: Store <State>,
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog,
    private popupService: PopupService
  ) { }

  ngOnInit() {
    this.appState = this.appStore.select(selectAppState);

    this.http.get(`${nodeRpc1}/blocks/latest`).subscribe( async (data:any) => {
      // @aakatev remove debugging
      this.totalTxsCount = data.block.header.total_txs;
      // @aakatev TODO FIX this formula only works if we
      // display  blocksToScan blocks per page  
      // this.lastPage = Math.ceil(this.totalTxsCount/this.blocksToScan);
      this.lastBlock = data.block.header.height;
      this.minHeight = this.lastBlock - this.blocksToScan;

      this.clearTxs();
      // this.fetchTxs();
      while(this.txs.length < this.INITIAL_TXS_COUNT) {
        await this.displayOlderTxs();
      }
    });
    // @aakatev remove debugging
    // console.log(this.dataSource.paginator);
  }

  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
    // visible height + pixel scrolled >= total height 
    // if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      console.log("End");
    // }
}

  clearTxs() {
    this.txs = [];
  }

  fetchTxs() {
    return new Promise ((resolve, reject) => {
      this.http.get(`${nodeRpc2}/tx_search?query="tx.height>${this.minHeight}"`)
        .subscribe( (data:any) => {
        // this.clearTxs();
        let currTxs = data.result.txs.reverse();
        
        // TODO remove debugging
        // console.log(data['result'].txs);
        console.log(data);

        currTxs.forEach(dataTx => {
          if(dataTx.height < this.minHeight + this.blocksToScan) {
            this.txs.push({
              hash: dataTx.hash, 
              height: dataTx.height,
              gasUsed: dataTx.tx_result.gasUsed,
              gasWanted: dataTx.tx_result.gasWanted
            });        
          }
        });

        if(this.txs.length >= 0) {
          this.txs.forEach( (tx) => {
            if(tx.height < this.minHeight + this.blocksToScan) {
              this.getTxDetails(tx)
                .subscribe( (data:any) => {
                  // TODO remove debugging
                  // console.log(data);

                  tx.fee = data.tx.value.fee;
                  tx.memo = data.tx.value.memo;
                  tx.msg = data.tx.value.msg;
                  tx.details = data;
                  tx.action = [];

                  if(data.tags) {
                    let index = 0;
                    data.tags.forEach((tag:any) => {
                      // TODO remove debugging
                      // console.log(tag);
                      if(tag.key === 'action') {
                        tx.action[index] = tag.value.replace(/_/g, ' ');
                        index += 1;
                      }
                    });
                  }
                  // END LOGIC FOR NOT-FAULTY  

                  if(data.code === 12) {
                    // TODO remove debugging
                    // console.log(data);
                    // tx['action'] = "out of gas";
                    tx.error = "out of gas";
                  } else if (data.code === 104) {
                    tx.error = "no delegation distribution info";
                    // TODO remove debugging
                    // console.log(data);
                  } else if (data.code === 10) {
                    tx.error = "insufficient account funds";
                    // TODO remove debugging
                    // console.log(data);
                  } else if (data.code === 102) {
                    tx.error = "no delegation for this (address, validator) pair";
                    // TODO remove debugging
                    // console.log(data);
                  } else if (data.code) {
                    // TODO @aakatev find more failed tx codes
                    tx.error = "TEST"
                    console.log(data);
                  }
                },
                err => {
                  // @aakatev some txs cause 500 errors
                  // otherwise would dump code in console
                  // console.log(err);
                });
            }
          });
          this.dataSource = new MatTableDataSource<any>([...this.txs]);
          this.setDataSourceAttributes();
          resolve();
        }
      });
    });
  }

  async displayOlderTxs () {
    await this.fetchTxs(); 
    this.minHeight -= this.blocksToScan; 
    // this.currentPage += 1;
  }

  displayNewerTxs () {
    this.minHeight += this.blocksToScan;
    this.fetchTxs();  
    // this.currentPage -= 1;
  }

  getTxDetails(tx: Tx) {
    return this.http.get(`${nodeRpc1}/txs/${tx.hash}`);
  }

  queryTx(txHash) {
    let tx;
    this.http.get(`${nodeRpc1}/txs/${txHash}`).subscribe((data:any) => {
      tx = {
        hash: data.txhash, 
        height: data.height,
        gasUsed: data.gasUsed,
        gasWanted: data.gasWanted,
        details: data,
        fee: data.tx.value.fee,
        memo: data.tx.value.memo,
        msg: data.tx.value.msg,
        error: null,
        action: []
      };

      if(data.tags) {
        let index = 0;
        data.tags.forEach((tag:any) => {
          // TODO remove debugging
          // console.log(tag);
          if(tag.key === 'action') {
            tx.action[index] = tag.value.replace(/_/g, ' ');
            index += 1;
          }
        });
      }
      // END LOGIC FOR NOT-FAULTY  

      if(data.code === 12) {
        // TODO remove debugging
        // console.log(data);
        // tx['action'] = "out of gas";
        tx.error = "out of gas";
      } else if (data.code === 104) {
        tx.error = "no delegation distribution info";
        // TODO remove debugging
        // console.log(data);
      } else if (data.code === 10) {
        tx.error = "insufficient account funds";
        // TODO remove debugging
        // console.log(data);
      } else if (data.code === 102) {
        tx.error = "no delegation for this (address, validator) pair";
        // TODO remove debugging
        // console.log(data);
      } else if (data.code) {
        // TODO @aakatev find more failed tx codes
        tx.error = "TEST"
        console.log(data);
      }
    },
    err => {
      // @aakatev some txs cause 500 errors
      // otherwise would dump code in console
      // console.log(err);
    },
    () => {
      // TODO remove debugging
      // console.log(tx);
      this.openTxDialog(tx);
    });
  }

  onCopySucceess() {
    // const options = { toastClass: 'opacity' };
    this.toastr.success('Copied to clipboard');
  }

  openTxsListDialog(address) {
    this.dialog.open( AccountDetailComponent,  {
      data: { 
        address
      },
      height: '75vh'
    });
  }

  openTxDialog(tx) {
    this.dialog.open( TxComponent,  {
      data: { 
        tx
      },
      height: '75vh'
    });
  }

  openValidatorDialog(operatorAddress) {
    this.popupService.openValidatorDialogAddr(operatorAddress, this.dialog);
  }

  // TEST ACCOUNT QUERY
  // queryAccount(address) {
  //   this.openTxsListDialog(address);
  // }

  // END TEST ACCOUNT QUERY
  // TODO figuire out how to open on separate route
  // routeToTxPage() {
  //   // let data = MAT_DIALOG_DATA();
  //   // this.router.navigate(['/edit-transaction-portal'], { queryParams: { bill: 'U001' } });
  // }

}

