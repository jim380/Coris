import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.css']
})
export class ProgressSpinnerComponent implements OnInit {

  isLoading = false;

  constructor() {
    this.isLoading = true;
    this.getRPCData()
      .subscribe(x => this.isLoading = false);
  }

  // dummy method to simulate fetching data through RPC
  getRPCData() {
    return timer(2000);
  }

  ngOnInit() {
  }

}
