import { Component, OnInit, Inject, ViewChild, AfterViewInit, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatPaginator, MatTableDataSource } from '@angular/material';
import { TxsService } from 'src/app/services/txs.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-txs-list-card',
  templateUrl: './txs-list-card.component.html',
  styleUrls: ['./txs-list-card.component.scss']
})
export class TxsListCardComponent implements OnInit, AfterViewInit {
  delegator = {
    address: "",
    txs: {
      staking: [],
      transfer: []
    }
    // coins: null
  }
  displayedColumns: string[] = ['hash', 'height'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() address: string;

  constructor(
    // @Inject(MAT_DIALOG_DATA) public data: any, 
    private ts: TxsService, 
    private toastr: ToastrService
  ) { 
    // this.delegator.address = data.address;
    // TODO remove debugging
    // console.log(data);
    
  }

  ngOnInit() {
    this.ts.getTransferTxs(this.address, 100, 1).subscribe((data: any) => {
      // TODO remove debugging
      console.log("Txs:", data);
      this.delegator.txs.transfer = data;
    });

    this.ts.getStakingTxs(this.address).subscribe((data: any) => {
      // TODO remove debugging
      // console.log("Staking txs:", data);
      this.initTable(data);
      this.delegator.txs.staking = data;
    });
    

    // this.ts.getAccountInfo(this.delegator.address).subscribe((data: any) => {
    //   // TODO remove debugging
    //   console.log(data);
    //   this.delegator.coins = data.value.coins;
    // });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public onTabChange(event) {
    let tabLabel = event.tab.textLabel.toLowerCase();
    this.initTable( this.delegator.txs[tabLabel] );
    // TODO remove debugging 
    // console.log( tabLabel );
  }

  public initTable(array) {
    this.dataSource = new MatTableDataSource<any>([...array]);
    this.dataSource.paginator = this.paginator;
  }

  public onCopySuccess() {
    this.toastr.success('Copied to clipboard');
  }

}
