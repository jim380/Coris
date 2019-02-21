import { Component, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { Inject }  from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { nodeRpc } from '../../config.js'

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})

export class BlockComponent implements OnInit {
  block = {};
  queryHeight = 0;
  displayCommits = false;

  constructor(private http: HttpClient, @Inject(DOCUMENT) document, private route: ActivatedRoute) { 
    this.queryHeight = Number(this.route.snapshot.paramMap.get('height'));
  }

  ngOnInit() {
    this.fetchBlock();
  }

  fetchBlock() {
    this.http.get(`${nodeRpc}//block?height=${this.queryHeight}`).subscribe(data => {
      this.block = data['result'].block;
    });
  }

  showHideElem() {
    this.displayCommits = !this.displayCommits;
  }
}
