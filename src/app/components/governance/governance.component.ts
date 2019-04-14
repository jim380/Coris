import { Component, OnInit } from '@angular/core';
import { Proposal } from 'src/app/interfaces/proposal.interface';
import { HttpClient } from '@angular/common/http';
import { nodeRpc1 } from '../../../config.js';

@Component({
  selector: 'app-governance',
  templateUrl: './governance.component.html',
  styleUrls: ['./governance.component.css']
})
export class GovernanceComponent implements OnInit {
  proposals: Proposal[];
  
  displayedColumns: string[] = [
    'id', 
    'title', 
    'status',
    'submitted',
    'voting',
    'deposit'
  ];

  constructor(private http: HttpClient) { }

  clearProposals() {
    this.proposals = [];
  }

  fetchProposals() {
    this.http.get(`${nodeRpc1}/gov/proposals`)
      .subscribe(data => {
        console.log(data);
        this.clearProposals();
        (data as Proposal[]).forEach(proposal => {
          this.proposals.push(proposal);
        });
      });
  }

  ngOnInit() {
    this.fetchProposals();
  }
}
