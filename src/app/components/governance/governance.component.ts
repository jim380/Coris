import { Component, OnInit, ViewChild } from '@angular/core';
import { Proposal } from 'src/app/interfaces/proposal.interface';
import { HttpClient } from '@angular/common/http';
import { nodeRpc1 } from '../../../config.js';
import { MatDialog, MatTableDataSource, MatTable } from '@angular/material';
import { GovDetailComponent } from './gov-detail/gov-detail.component';
import { trigger, style, animate, transition, state } from '@angular/animations';

@Component({
  selector: 'app-governance',
  templateUrl: './governance.component.html',
  styleUrls: ['./governance.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class GovernanceComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<any>;
  private expandedElement: any | null;
  private dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
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

        this.proposals.forEach( (proposal: any) => {
          this.getProposer(proposal.proposal_id).subscribe( (data:any) => {
            // TODO remove debugging
            console.log(data.proposer);
            proposal.proposer = data.proposer;
          },
          error => {
            // @aakatev 
            // By default, RPC client responds with 500 
            // if proposer wasnt, found.
            // We want to avoid terminal flood and thus 
            // this dummy block 
          });
        });
        this.dataSource = new MatTableDataSource<any>([...this.proposals]);
      });
  }
  
  getProposer(proposalId) {
    return this.http.get(`${nodeRpc1}/gov/proposals/${proposalId}/proposer`);
  }

  openGovDetailDialog(data) {
    this.dialog.open( GovDetailComponent,  {
      data
    });
  }
}
