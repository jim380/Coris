import { Component, OnInit, ViewChild } from '@angular/core';
// import { Proposal } from 'src/app/interfaces/proposal.interface';
import { MatTableDataSource, MatTable } from '@angular/material';
import { trigger, style, animate, transition, state } from '@angular/animations';
import { GovService } from 'src/app/services/gov.service';
import { PopupService } from 'src/app/services/popup.service';
import { GovDetailComponent } from '../popups/gov-detail/gov-detail.component';

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
  public expandedElement: any | null;
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  public proposals: any[];
  
  displayedColumns: string[] = [
    'id', 
    'title', 
    'status',
    'submitted',
    // 'voting',
    'deposit',
    `depositEnd`
  ];

  constructor(
    private popupService: PopupService,
    private gs: GovService
  ) { }

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
        // console.log(data);
        this.clearProposals();
        (data as any[]).forEach(proposal => {
          let formattedStatus = 
              proposal.proposal_status === "VotingPeriod" 
              ? "Voting Period" 
              : proposal.proposal_status;

          this.proposals.push({
            proposal_id: proposal.proposal_id,
            proposal_status: formattedStatus,
            submit_time: proposal.submit_time,
            deposit_end_time: proposal.deposit_end_time,
            proposal_content: proposal.proposal_content,
            total_deposit: proposal.total_deposit,
            voting_end_time: proposal.voting_end_time,
            voting_start_time: proposal.voting_start_time
          });
        });

        this.proposals.forEach( (proposal: any) => {
          this.gs.getCurrentTally(proposal.proposal_id).subscribe( (data:any) => {
            // TODO remove debugging
            // console.log(data);
            proposal.currentTally = data;
          },
          error => {
            console.log("Tally error!");
          });
        });
        this.dataSource = new MatTableDataSource<any>([...this.proposals]);
      });
  }
  
  openGovDetailDialog(proposal) {
    this.popupService.openGovDetailDialog(proposal);
  }
}
