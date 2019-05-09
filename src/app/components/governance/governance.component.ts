import { Component, OnInit } from '@angular/core';
import { Proposal } from 'src/app/interfaces/proposal.interface';
import { HttpClient } from '@angular/common/http';
import { nodeRpc1 } from '../../../config.js';
import { MatDialog } from '@angular/material';
import { GovDetailComponent } from './gov-detail/gov-detail.component.js';

@Component({
  selector: 'app-governance',
  templateUrl: './governance.component.html',
  styleUrls: ['./governance.component.scss']
})
export class GovernanceComponent implements OnInit {
  private proposals: Proposal[];
  
  displayedColumns: string[] = [
    'id', 
    'title', 
    'status',
    'submitted',
    // 'voting',
    'deposit',
    `depositEnd`
  ];

  constructor(private http: HttpClient, private dialog: MatDialog) { }

  ngOnInit() {
    this.fetchProposals();
  }

  clearProposals() {
    this.proposals = [];
  }

  fetchProposals() {
    this.http.get(`${nodeRpc1}/gov/proposals`)
      .subscribe(data => {
        // TODO remove debugging
        console.log(data);
        this.clearProposals();
        (data as Proposal[]).forEach(proposal => {
          this.proposals.push(proposal);
        });
      });
  }

  openGovDetailDialog( data = { 
    testData: "data"
  }) {
    this.dialog.open( GovDetailComponent,  {
      data
    });
  }
}
