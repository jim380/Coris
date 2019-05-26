export interface Validator {
  operator_address: String;
  consensus_pubkey: String;
  jailed: Boolean;
  status:	Number;
  tokens:	String;
  delegator_shares:	String;
  description: any;
  unbonding_height: String;
  unbonding_time: String;
  commission: any;
  min_self_delegation: String;
  unbonding_total: Number;
  signing_info: any;
  outstanding_rewards: any;
  rewards: any;
  unbonding_delegations: any;
  distribution: any;
  account: any;
  delegations: any;
  self_bond: Number;
}
  