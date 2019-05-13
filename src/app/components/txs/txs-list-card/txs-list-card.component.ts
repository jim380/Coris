import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { TxsService } from 'src/app/services/txs.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-txs-list-card',
  templateUrl: './txs-list-card.component.html',
  styleUrls: ['./txs-list-card.component.scss']
})
export class TxsListCardComponent implements OnInit {
  address: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ts: TxsService) { 
    this.address = data.address;
    // TODO remove debugging
    console.log(data);
  }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  
  ngOnInit() {
    this.ts.getTxs(this.address, 20, 1).subscribe((data: any) => {
      console.log(data);
    });

    this.ts.getStakingTxs(this.address).subscribe((data: any) => {
      console.log(data);
    });
  }

}
