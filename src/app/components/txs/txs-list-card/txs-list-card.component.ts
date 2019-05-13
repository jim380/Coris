import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatPaginator, MatTableDataSource } from '@angular/material';
import { TxsService } from 'src/app/services/txs.service';

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
  }
  displayedColumns: string[] = ['hash', 'height'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ts: TxsService) { 
    this.delegator.address = data.address;
    // TODO remove debugging
    // console.log(data);
    
  }

  
  ngOnInit() {
    this.ts.getTxs(this.delegator.address, 20, 1).subscribe((data: any) => {
      // TODO remove debugging
      console.log(data);
      this.delegator.txs.transfer = data;
    });

    this.ts.getStakingTxs(this.delegator.address).subscribe((data: any) => {
      // TODO remove debugging
      console.log(data);
      this.initTable(data);
      this.delegator.txs.staking = data;
    });
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

}
