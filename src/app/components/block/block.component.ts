import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { nodeRpc2 } from '../../../config.js';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})

export class BlockComponent implements OnInit {
  block = {};
  queryHeight = 0;
  displayCommits = false;

  constructor(
    private http: HttpClient, 
    private route: ActivatedRoute, 
    private router: Router) { }

  async clickButton(value) {
    await this.router.navigate([`block/${value}`]);

    this.fetchBlock();
  }
  ngOnInit() {
    this.fetchBlock();
  }

  fetchBlock() {
    this.queryHeight = Number(this.route.snapshot.paramMap.get('height'));

    this.http.get(`${nodeRpc2}//block?height=${this.queryHeight}`).subscribe(data => {
      if (data['error'] === undefined) this.block = data['result'].block;
      else this.block = {};
    });
  }

  showHideElem() {
    this.displayCommits = !this.displayCommits;
  }
}
