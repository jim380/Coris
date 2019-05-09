import { Injectable } from '@angular/core';
import { nodeRpc1 } from './../../config.js';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GovService {

  constructor(private http: HttpClient) { }

  getProposals() {
    return this.http.get(`${nodeRpc1}/gov/proposals`);
  }

  getProposer(proposalId) {
    return this.http.get(`${nodeRpc1}/gov/proposals/${proposalId}/proposer`);
  }
}
