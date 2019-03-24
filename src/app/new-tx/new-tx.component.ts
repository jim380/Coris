import { Component, OnInit } from '@angular/core';
import { TxsService } from '../txs.service';

@Component({
  selector: 'app-new-tx',
  templateUrl: './new-tx.component.html',
  styleUrls: ['./new-tx.component.css']
})
export class NewTxComponent implements OnInit {

  constructor(private txs:TxsService) { }

  ngOnInit() {
  }

}
