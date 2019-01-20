import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Block } from './block';

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.css']
})
export class BlocksComponent implements OnInit {
  blocks = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('https://aakatev.me/iris/status').subscribe(data => {
      // Debugging
      // let currValidators = data['result'].genesis.validators;
      let lastBlock = data['result'].sync_info.latest_block_height;

      this.http.get(`https://aakatev.me/iris/blockchain?minHeight=${lastBlock-50}&maxHeight=${lastBlock}`).subscribe(data => {
        this.blocks = data['result'].block_metas;
      });
    });
  }
}
