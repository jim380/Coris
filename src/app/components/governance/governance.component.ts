import { Component, OnInit, ViewChild } from '@angular/core';
// import { Proposal } from 'src/app/interfaces/proposal.interface';
import { MatDialog, MatTableDataSource, MatTable } from '@angular/material';
import { GovDetailComponent } from './gov-detail/gov-detail.component';
import { trigger, style, animate, transition, state } from '@angular/animations';
import { GovService } from 'src/app/services/gov.service';

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
  private proposals: any[];
  
  displayedColumns: string[] = [
    'id', 
    'title', 
    'status',
    'submitted',
    // 'voting',
    'deposit',
    `depositEnd`
  ];

  constructor(private dialog: MatDialog, private gs: GovService) { }

  ngOnInit() {
    this.initProposals();
  }

  clearProposals() {
    this.proposals = [];
  }

  initProposals() {
    this.gs.getProposals()
      .subscribe(data => {
        // TODO remove debugging
        console.log(data);
        this.clearProposals();
        (data as any[]).forEach(proposal => {
          this.proposals.push({
            proposal_id: proposal.proposal_id,
            proposal_status: proposal.proposal_status,
            submit_time: proposal.submit_time,
            deposit_end_time: proposal.deposit_end_time,
            // final_tally_result: proposal.final_tally_result,
            proposal_content: proposal.proposal_content,
            total_deposit: proposal.total_deposit,
            voting_end_time: proposal.voting_end_time,
            voting_start_time: proposal.voting_start_time
          });
        });

        this.proposals.forEach( (proposal: any) => {
          this.gs.getProposer(proposal.proposal_id).subscribe( (data:any) => {
            // TODO remove debugging
            // console.log(data.proposer);
            proposal.proposer = data.proposer;
          },
          error => {
            // @aakatev 
            // By default, RPC client responds with 500 
            // if proposer wasnt, found.
            // We want to avoid terminal flood and thus 
            // this dummy block 
          });

          this.gs.getCurrentTally(proposal.proposal_id).subscribe( (data:any) => {
            // TODO remove debugging
            // console.log(data);
            proposal.currentTally = data;
          },
          error => {
            console.log("Tally error!");
          });

          this.gs.getCurrentDeposits(proposal.proposal_id).subscribe( (data:any) => {
            // TODO remove debugging
            // console.log(data);
            proposal.currentDeposit = data;
          },
          error => {
            console.log("Deposit error!");
          });

          this.gs.getCurrentVotes(proposal.proposal_id).subscribe( (data:any) => {
            // TODO remove debugging
            // console.log(data);
            proposal.currentVotes = data;
          },
          error => {
            console.log("Votes error!");
          });

        });
        this.dataSource = new MatTableDataSource<any>([...this.proposals]);
      });
  }
  
  openGovDetailDialog(data) {
    this.dialog.open( GovDetailComponent,  {
      data
    });
  }
}
